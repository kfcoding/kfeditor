import { Range } from "slate";
import { Change, Node } from "slate";

export default (
  options,
  currentTextNode,
  matched,
  change
) => {
  const matchedLength = matched[0].length;
  const count = (matched[0].match(/#/g) || []).length;
  let header;

  if (count === 1) header = 'h1';
  else if (count === 2) header = 'h2';
  else if (count === 3) header = 'h3';

  return change.setBlocks(header).deleteAtRange(
    Range.create({
      anchorKey: currentTextNode.key,
      focusKey: currentTextNode.key,
      anchorOffset: matched.index,
      focusOffset: matched.index + matchedLength
    })
  );
};