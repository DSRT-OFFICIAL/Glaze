// ==================== Glaze Color Library Full Public Version ====================

package glaze; // optional package name for library

import java.util.*;
import java.util.stream.Collectors;

// ==================== Color Class ====================
public class Color {
    public int r, g, b;

    // Constructors
    public Color(int r, int g, int b) {
        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
    }

    public Color(String hex) {
        if(hex.startsWith("#")) hex = hex.substring(1);
        if(hex.length() == 3)
            hex = "" + hex.charAt(0)+hex.charAt(0)+hex.charAt(1)+hex.charAt(1)+hex.charAt(2)+hex.charAt(2);
        this.r = Integer.parseInt(hex.substring(0,2),16);
        this.g = Integer.parseInt(hex.substring(2,4),16);
        this.b = Integer.parseInt(hex.substring(4,6),16);
    }

    // ==================== Conversion ====================
    public String toHex() { return String.format("#%02X%02X%02X", r, g, b); }

    public double[] toHsl() {
        double rNorm=r/255.0, gNorm=g/255.0, bNorm=b/255.0;
        double max=Math.max(rNorm, Math.max(gNorm,bNorm));
        double min=Math.min(rNorm, Math.min(gNorm,bNorm));
        double h=0, s, l=(max+min)/2;
        if(max==min){h=s=0;} else{
            double d=max-min;
            s=l>0.5?d/(2-max-min):d/(max+min);
            if(max==rNorm) h=(gNorm-bNorm)/d + (gNorm<bNorm?6:0);
            else if(max==gNorm) h=(bNorm-rNorm)/d +2;
            else h=(rNorm-gNorm)/d +4;
            h/=6;
        }
        return new double[]{h*360,s*100,l*100};
    }

    public double[] toCmyk() {
        double rN=r/255.0,gN=g/255.0,bN=b/255.0;
        double k=1-Math.max(rN,Math.max(gN,bN));
        double c=(1-rN-k)/(1-k);
        double m=(1-gN-k)/(1-k);
        double y=(1-bN-k)/(1-k);
        if(k==1) c=m=y=0;
        return new double[]{c*100,m*100,y*100,k*100};
    }

    // ==================== Manipulation ====================
    public Color lighten(double percent){
        return new Color(
            (int)clamp(r+r*percent/100,0,255),
            (int)clamp(g+g*percent/100,0,255),
            (int)clamp(b+b*percent/100,0,255)
        );
    }

    public Color darken(double percent){
        return new Color(
            (int)clamp(r-r*percent/100,0,255),
            (int)clamp(g-g*percent/100,0,255),
            (int)clamp(b-b*percent/100,0,255)
        );
    }

    public Color invert(){ return new Color(255-r,255-g,255-b); }

    public Color blend(Color other,double ratio){
        double rB=r*(1-ratio)+other.r*ratio;
        double gB=g*(1-ratio)+other.g*ratio;
        double bB=b*(1-ratio)+other.b*ratio;
        return new Color((int)rB,(int)gB,(int)bB);
    }

    public Color mix(Color other,double ratio){ return blend(other,ratio); }

    public static Color randomColor(){
        Random rand=new Random();
        return new Color(rand.nextInt(256),rand.nextInt(256),rand.nextInt(256));
    }

    private static int clamp(int val,int min,int max){ return Math.max(min,Math.min(max,val)); }

    @Override
    public String toString(){ return toHex(); }
}

// ==================== Palette Class ====================
public class Palette {
    private List<Color> colors;
    public Palette(){ colors=new ArrayList<>(); }
    public void addColor(Color color){ colors.add(color); }
    public void removeColor(int index){ if(index>=0 && index<colors.size()) colors.remove(index); }
    public Color getRandomColor(){ return colors.get(new Random().nextInt(colors.size())); }
    public void shuffle(){ Collections.shuffle(colors); }
    public List<Color> getColors(){ return colors; }
    public String toHexList(){ return colors.stream().map(Color::toHex).collect(Collectors.joining(", ")); }
}

// ==================== Gradients ====================
public class Gradients {
    public static List<Color> linearGradient(Color start, Color end, int steps){
        List<Color> result=new ArrayList<>();
        for(int i=0;i<steps;i++){
            double ratio=i/(double)(steps-1);
            result.add(start.blend(end, ratio));
        }
        return result;
    }

    public static List<Color> radialGradient(Color center, Color edge, int steps){
        return linearGradient(center, edge, steps); // simplified
    }

    public static List<Color> conicGradient(Color start, Color end, int steps){
        return linearGradient(start,end,steps); // simplified
    }
}

// ==================== Effects ====================
public class Effects {
    public static Color noise(Color color,double intensity){
        Random rand=new Random();
        int nr=color.r+(int)((rand.nextDouble()-0.5)*intensity*255);
        int ng=color.g+(int)((rand.nextDouble()-0.5)*intensity*255);
        int nb=color.b+(int)((rand.nextDouble()-0.5)*intensity*255);
        return new Color(clamp(nr,0,255),clamp(ng,0,255),clamp(nb,0,255));
    }

    public static Color grain(Color color,double intensity){ return noise(color,intensity); }

    public static Color glow(Color color,double intensity){ return color.lighten(intensity*10); }

    public static Color overlay(Color base, Color top,double ratio){ return base.blend(top,ratio); }

    private static int clamp(int val,int min,int max){ return Math.max(min, Math.min(max,val)); }
}

// ==================== Accessibility ====================
public class Accessibility {
    public static double contrast(Color c1, Color c2){
        double l1=0.2126*Math.pow(c1.r/255.0,2.2)+0.7152*Math.pow(c1.g/255.0,2.2)+0.0722*Math.pow(c1.b/255.0,2.2);
        double l2=0.2126*Math.pow(c2.r/255.0,2.2)+0.7152*Math.pow(c2.g/255.0,2.2)+0.0722*Math.pow(c2.b/255.0,2.2);
        double L1=Math.max(l1,l2),L2=Math.min(l1,l2);
        return (L1+0.05)/(L2+0.05);
    }

    public static String readability(Color c1, Color c2){
        double ratio=contrast(c1,c2);
        if(ratio>=7) return "AAA";
        else if(ratio>=4.5) return "AA";
        else return "Fail";
    }

    public static boolean blindFriendly(Color color){ return !(color.r==color.g && color.g==color.b); }
}

// ==================== Analysis ====================
public class Analysis {
    public static Color dominant(List<Color> colors){ return colors.isEmpty()?null:colors.get(0); }
    public static List<Color> harmony(Color color, String type){
        if(type.equals("complementary")) return Arrays.asList(color,color.invert());
        return Arrays.asList(color);
    }
    public static String temperature(Color color){ return (color.r>color.b)?"warm":(color.b>color.r)?"cool":"neutral"; }
}

// ==================== IO ====================
public class IOUtils {
    public static String json(Palette palette){
        return "["+palette.getColors().stream().map(Color::toHex).collect(Collectors.joining(","))+"]";
    }

    public static String svg(Palette palette,int width,int height){
        StringBuilder sb=new StringBuilder();
        sb.append("<svg width='"+width+"' height='"+height+"'>");
        int w=width/palette.getColors().size();
        for(int i=0;i<palette.getColors().size();i++){
            sb.append("<rect x='"+(i*w)+"' y='0' width='"+w+"' height='"+height+"' fill='"+palette.getColors().get(i).toHex()+"' />");
        }
        sb.append("</svg>");
        return sb.toString();
    }
          }
