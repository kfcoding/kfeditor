import { NODE_DATA_INVALID } from 'slate-schema-violations';
import EditTable from 'slate-edit-table';

const tablePlugin = EditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
});

function setColumnAlign(change, align) {
  const pos = tablePlugin.utils.getPosition(change.value);
  const columnCells = tablePlugin.utils.getCellsAtColumn(
    pos.table,
    pos.getColumnIndex()
  );
  columnCells.forEach(cell => {
    change.setNodeByKey(cell.key, { data: { align } });
  });
  return change;
}

const alignPlugin = {
  schema: {
    blocks: {
      table_cell: {
        data: {
          align: align => ['left', 'center', 'right'].includes(align)
        },
        normalize(change, violation, context) {
          if (violation === NODE_DATA_INVALID) {
            change.setNodeByKey(context.node.key, {
              data: context.node.data.set('align', 'left')
            });
          }
        }
      }
    }
  },

  changes: {
    setColumnAlign
  }
};

export default alignPlugin;
