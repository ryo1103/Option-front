interface SimplifyStrConfig {
    frontBeginIndex?: number; //开始位置索引,默认值=0
    frontLength?: number; // 前面部分的长度,默认值=6
    endingLength?: number; // 后面部分的长度,默认值=4
    connectSymbol: string// 前后两部分的连接符号，,默认值="..."
  }
  export const simplifyStr = (str: string, config?: SimplifyStrConfig): string => {
    const defaultConfig = { frontBeginIndex: 0, frontLength: 6, connectSymbol: '...', endingLength: 4 };
    const { frontBeginIndex, frontLength, connectSymbol, endingLength } = { ...defaultConfig, ...config }
    return str ? `${str.substring(frontBeginIndex, frontBeginIndex + frontLength)}${connectSymbol}${str.substring(str.length - endingLength)}` : '-'
  }
  