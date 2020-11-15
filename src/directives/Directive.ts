export abstract class Directive {

    static directiveName: string;
    static mainFlagColor: ColorConstant;
    static secondaryFlagColor: ColorConstant;

    static filter(flag: Flag): boolean {
        return flag.color == this.mainFlagColor && flag.secondaryColor == this.secondaryFlagColor;
    }
}