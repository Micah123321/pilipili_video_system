package com.shield.pilipili;

import org.joda.time.DateTime;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {

    public static final String PATTEN_DEFAULT_YMD = "yyyy-MM-dd";

    /**
     * 将距离1970年的数字时间转换成正常的字符串格式时间；
     * 比如数字时间："1513345743"
     * 转换后："2017-12-15 21:49:03"
     *
     * @param time
     * @return
     */
    public static String secondToTime(String time) {
        String dateStr = "1970-1-1 00:00:00";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (time.equals("0")) {
            return "";
        }
        Date miDate;
        String returnstr = "";
        try {
            miDate = sdf.parse(dateStr);
            Object t1 = miDate.getTime();
            long h1 = Long.parseLong(time.toString()) * 1000 + Long.parseLong(t1.toString());
            returnstr = sdf.format(h1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return returnstr;
    }

    public static String secondToTimeEight(String time) {
        String dateStr = "1970-1-1 00:00:00";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (time.equals("0")) {
            return "";
        }
        Date miDate;
        String returnstr = "";
        try {
            miDate = sdf.parse(dateStr);
            Object t1 = miDate.getTime();
            long h1 = Long.parseLong(time) * 1000 + Long.parseLong(t1.toString());
            h1 -= 28800000;//8小时的时间差，可根据需求进行增减
            returnstr = sdf.format(h1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return returnstr;
    }

    /**
     * 秒转换为指定格式的日期
     *
     * @param second
     * @param patten
     * @return
     */
    public static String secondToDate(long second, String patten) {
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(second * 1000);//转换为毫秒
        Date date = calendar.getTime();
        SimpleDateFormat format = new SimpleDateFormat(patten);
        String dateString = format.format(date);
        return dateString;
    }

    /**
     * 判断日期是不是今天
     *
     * @param date
     * @return 是返回true，不是返回false
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

    /**
     * 将字符串时间格式转换成Date时间格式，参数String类型
     * 比如字符串时间："2017-12-15 21:49:03"
     * 转换后的date时间：Fri Dec 15 21:49:03 CST 2017
     *
     * @param datetime 类型为String
     * @return
     */
    public static Date StringToDate(String datetime) {
        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            date = sdFormat.parse(datetime);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 将字符串转换为日期
     *
     * @param str
     * @return
     */
    public static Date toDate(String str, String pattern) {
        DateFormat format = new SimpleDateFormat(pattern);
        format.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        try {
            Date date = format.parse(str);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Date();
    }

    /**
     * 将日期转换成指定格式的字符串
     *
     * @param date
     * @return
     */
    public static String d2String(Date date, String pattern) {
        DateFormat format = new SimpleDateFormat(pattern);
        format.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        return format.format(date);
    }

    /**
     * 格式化时间
     *
     * @param date
     * @return 今天当天内的不显示日期只显示时间（例如今天13:30），昨天的日期显示为昨天时间不变（例如昨天13:30），其它的正常显示 日期和时间（例如 2020-12-30 12:00:00）
     */
    public static String format(Date date) {
        DateTime now = new DateTime();
        DateTime today_start = new DateTime(now.getYear(), now.getMonthOfYear(), now.getDayOfMonth(), 0, 0, 0);
        DateTime today_end = today_start.plusDays(1);
        DateTime yesterday_start = today_start.minusDays(1);

        if (date.after(today_start.toDate()) && date.before(today_end.toDate())) {
            return String.format("今天 %s", new DateTime(date).toString("HH:mm"));
        } else if (date.after(yesterday_start.toDate()) && date.before(today_start.toDate())) {
            return String.format("昨天 %s", new DateTime(date).toString("HH:mm"));
        }

        return new DateTime(date).toString("yyyy-MM-dd HH:mm");
    }

    /**
     * 判断是否在三天之内
     * @param date
     * @return
     */
    public static String pAppeal(Date date) {
        DateTime now = new DateTime();
        DateTime today_start = new DateTime(now.getYear(), now.getMonthOfYear(), now.getDayOfMonth(), 0, 0, 0);
        DateTime today_end = today_start.plusDays(1);
        DateTime yesterday_start = today_start.minusDays(1);

        if (date.after(today_start.toDate()) && date.before(today_end.toDate())) {
            return String.format("...2天后过期", new DateTime(date).toString("HH:mm"));
        } else if (date.after(yesterday_start.toDate()) && date.before(today_start.toDate())) {
            return String.format("...1天后过期", new DateTime(date).toString("HH:mm"));
        }

        return "...已过期";
    }
    /**
     * 日期的加减方法
     * 用于在当前的天或者小时或者分钟或者月份的基础上加上或者减去若干小时，分钟，日，月
     * @param currentDay 当前月份的某一天
     * @param day (Calendar.DATE 天 Calendar.HOUR 小时 Calendar.MINUTE 分钟 Calendar.MONTH 月)需要加上的天数或者需要减去的天数，
     * 例如：加上10天：(Calendar.DATE,10）减去十天：(Calendar.DATE,-10)
     * @return 返回加上或者减去的那个日期
     * @author 程熙
     * ${2013-11-19}
     */
    public static Date dayAddAndSub(int currentDay,int day,Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(currentDay, day);
        Date startDate = calendar.getTime();
        return startDate;
    }

}
