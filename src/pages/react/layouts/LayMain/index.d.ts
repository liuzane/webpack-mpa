interface LayoutCommonType {
  className?: string;
  style?: {
    [key: string]: string | number;
  };
  children?: any;
}

interface LayCustomType extends LayoutCommonType {
  noPadding?: boolean;
}

export declare const LayMain: React.FC<LayoutCommonType>;
export declare const LayHeader: React.FC<LayoutCommonType>;
export declare const LaySider: React.FC<LayoutCommonType>;
export declare const LaySection: React.FC<LayoutCommonType>;
export declare const LayContent: React.FC<LayCustomType>;
export declare const LayContainer: React.FC<LayoutCommonType>;
export declare const LayBlock: React.FC<LayCustomType>;
