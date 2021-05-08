package com.shield.pilipili;


public class LevelUtil {

    public static Integer getLevelByExperience(Integer experience){
        Integer level=0;
        for (int i=1;i<=6;i++){
            if (experience>=100+((i-1)*100*Math.pow(2, i-1))){
                level=i;
            }
        }
        return level;
    }

    public static Integer getLevelBar(Integer experience){
        Double bar=0.0;
        double nextExperience=0;
        for (int i=1;i<=6;i++){
            if (experience<=100+((i-1)*100*Math.pow(2, i-1))){
                nextExperience=100+((i-1)*100*Math.pow(2, i-1));
                break;
            }
        }
        bar=experience/nextExperience;
        return ((Double)(bar*100)).intValue();
    }
    public static Integer getNextExperience(Integer experience){
        double nextExperience=0;
        for (int i=1;i<=6;i++){
            if (experience<=100+((i-1)*100*Math.pow(2, i-1))){
                nextExperience=100+((i-1)*100*Math.pow(2, i-1));
                break;
            }
        }
        return ((Double)nextExperience).intValue();
    }
}
