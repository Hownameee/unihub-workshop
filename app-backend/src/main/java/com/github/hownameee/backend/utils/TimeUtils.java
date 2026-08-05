package com.github.hownameee.backend.utils;

import java.time.OffsetDateTime;
import java.time.ZoneId;

public class TimeUtils {

    private static final ZoneId APPLICATION_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    public static OffsetDateTime now() {
        return OffsetDateTime.now(APPLICATION_ZONE);
    }
}
