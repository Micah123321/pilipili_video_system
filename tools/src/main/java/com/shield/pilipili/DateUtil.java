package com.shield.pilipili;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
    public static final String PATTEN_DEFAULT_YMD = "yyyy-MM-dd";
    /**
     * 秒转换为指定格式的日期
     * @param second
     * @param patten
     * @return
     */
    public static String secondToDate(long second,String patten) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(second * 1000);//转换为毫秒
        Date date = calendar.getTime();
        SimpleDateFormat format = new SimpleDateFormat(patten);
        String dateString = format.format(date);
        return dateString;
    }

    /**
     * 判断日期是不是今天
     * @param date
     * @return    是返回true，不是返回false
     */
    public static boolean isNow(Date date) {

        // 当前时间
        Date now = new Date();
        SimpleDateFormat sf = new SimpleDateFormat(PATTEN_DEFAULT_YMD);
        //获取今天的日期
        String nowDay = sf.format(now);
        //对比的时间
        String day = sf.format(date);

        return day.equals(nowDay);
    }

}
