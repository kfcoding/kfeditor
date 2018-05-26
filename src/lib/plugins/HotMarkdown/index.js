import {Change} from 'slate';
import MatchHeader from './match/header';
import MatchBlockQuote from './match/blockqoute';
import MatchCodeBlock from './match/codeBlock';

const CheckPatterns = (options, change) => {
  console.log(options);
  const {value} = change;
  const {texts} = value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;
  let matched;

  if ((matched = currentLineText.match(/(^\s*)#{1,6}\s/m))) {
    return MatchHeader(options, currentTextNode, matched, change);
  } else if ((matched = currentLineText.match(/^>\s/m))) {
    return MatchBlockQuote(currentTextNode, matched, change);
  }
  /*else if((matched = currentLineText.match(/^(?: {4}|\t)/m))){ // [Code Block] Prefixed by 4 spaces or 1 tab
     return MatchCodeBlock(options.codeOption, currentTextNode, matched, change);
   } else if ((matched = currentLineText.match(/^\s*```(\w+)?\s/m))) {  // [Code block]  ```lang
     return MatchCodeBlock(options.codeOption, currentTextNode, matched, change, matched[1]);
   }*/
}

export default (options) => {
  options = {
    codeOption: Object.assign(
      {
        onlyIn: node => node.type === 'code_block'
      },
      null
    )
  };
  console.log(options);
  return {
    onKeyDown: (event, change, editor) => {
      /*switch (event.key) {
          case "Enter":
              return onEnter(options, change);
      }*/
    },
    onKeyUp: (event, change, editor) => {
      if (event.key == ' ') {

        return CheckPatterns(options, change)
      }
    }
  };
};