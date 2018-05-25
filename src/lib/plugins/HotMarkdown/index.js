import { Change } from 'slate';
import MatchHeader from './match/header';

const CheckPatterns = (options, change) => {
  const { value } = change;
  const { texts } = value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;
  let matched;

  if ((matched = currentLineText.match(/(^\s*)#{1,6}\s/m))) {
    return MatchHeader(options, currentTextNode, matched, change);
  }
}

export default (options) => {
  return {
    onKeyDown: (event, change, editor) => {

    },
    onKeyUp: (event, change, editor) => {
      if (event.key == ' ') {
        return CheckPatterns(options, change)
      }
    }
  };
};