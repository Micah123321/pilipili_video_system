package com.shield.pilipili;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
    public static final String PATTEN_DEFAULT_YMD = "yyyy-MM-dd";
    /**
     * 将距离1970年的数字时间转换成正常的字符串格式时间；
     * 比如数字时间："1513345743"
     * 转换后："2017-12-15 21:49:03"
     * @param time
     * @return
     */
    public static String secondToTime(String time){
        String dateStr="1970-1-1 08:00:00";
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (time.equals("0")) {
            return "";
        }
        Date miDate;
        String returnstr="";
        try {
            miDate = sdf.parse(dateStr);
            Object t1=miDate.getTime();
            long h1=Long.parseLong(time.toString())*1000+Long.parseLong(t1.toString());
            returnstr=sdf.format(h1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return returnstr;
    }
    public static String secondToTimeEight(String time){
        String dateStr="1970-1-1 08:00:00";
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (time.equals("0")) {
            return "";
        }
        Date miDate;
        String returnstr="";
        try {
            miDate = sdf.parse(dateStr);
            Object t1=miDate.getTime();
            long h1=Long.parseLong(time)*1000+Long.parseLong(t1.toString());
            h1-=28800000;//8小时的时间差，可根据需求进行增减
            returnstr=sdf.format(h1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return returnstr;
    }
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
    /**
     * 将字符串时间格式转换成Date时间格式，参数String类型
     * 比如字符串时间："2017-12-15 21:49:03"
     * 转换后的date时间：Fri Dec 15 21:49:03 CST 2017
     * @param datetime 类型为String
     * @return
     */
    public static Date StringToDate(String datetime){
        SimpleDateFormat sdFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            date = sdFormat.parse(datetime);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return date;
    }
}
