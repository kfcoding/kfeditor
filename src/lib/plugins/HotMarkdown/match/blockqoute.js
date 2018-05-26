import {Range} from "slate";
import {Change, Node} from "slate";

export default (
  currentTextNode,
  matched,
  change
) => {
  const matchedLength = matched[0].length;
  return change.setBlocks('blockquote').deleteAtRange(
    Range.create({
      anchorKey: currentTextNode.key,
      focusKey: currentTextNode.key,
      anchorOffset: matched.index,
      focusOffset: matched.index + matchedLength
    })
  );
};