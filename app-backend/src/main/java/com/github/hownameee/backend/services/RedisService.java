package com.github.hownameee.backend.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final DefaultRedisScript<Long> RESERVE_SCRIPT;
    static {
        RESERVE_SCRIPT = new DefaultRedisScript<>();
        RESERVE_SCRIPT.setScriptText("""
                local userKey = KEYS[1]
                local slotsKey = KEYS[2]
                local ttl = tonumber(ARGV[1])

                if redis.call('EXISTS', userKey) == 1 then
                    return -1
                end

                local slots = redis.call('GET', slotsKey)
                if not slots or tonumber(slots) <= 0 then
                    return -2
                end

                redis.call('DECR', slotsKey)
                redis.call('SET', userKey, 'reserved', 'EX', ttl)
                return 1
                """);
        RESERVE_SCRIPT.setResultType(Long.class);
    }

    private void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void initializeSlots(Long workshopId, int totalCapacity) {
        String key = "workshop:" + workshopId + ":slots";
        this.set(key, String.valueOf(totalCapacity));
    }

    public boolean reserveSlot(Long workshopId, UUID userId) {
        String userKey = "workshop:" + workshopId + ":user:" + userId.toString();
        String slotsKey = "workshop:" + workshopId + ":slots";

        Long result = redisTemplate.execute(
                RESERVE_SCRIPT,
                java.util.List.of(userKey, slotsKey),
                "900");

        return result != null && result == 1L;
    }

    public void releaseSlot(Long workshopId, UUID userId) {
        String slotsKey = "workshop:" + workshopId + ":slots";
        String userKey = "workshop:" + workshopId + ":user:" + userId.toString();

        Boolean deleted = redisTemplate.delete(userKey);
        if (deleted != null && deleted) {
            redisTemplate.opsForValue().increment(slotsKey);
        }
    }

    public void confirmSlot(Long workshopId, UUID userId) {
        String userKey = "workshop:" + workshopId + ":user:" + userId.toString();
        redisTemplate.persist(userKey);
    }

    public boolean hasSlotsKey(Long workshopId) {
        String key = "workshop:" + workshopId + ":slots";
        Boolean exists = redisTemplate.hasKey(key);
        return exists != null && exists;
    }
}
