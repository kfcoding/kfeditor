import React from 'react';
import EditTable from 'slate-edit-table';
import alignPlugin from '../plugins/TableAligns';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const TablePlugin = EditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
});


class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    isInTable: PropTypes.bool
  };

  getChildContext() {
    return { isInTable: true };
  }

  insertColumn = () => {
    this.props.editor.change(TablePlugin.changes.insertColumn);
  }

  insertRow = () => {
    this.props.editor.change(TablePlugin.changes.insertRow);
  }

  removeColumn = () => {
    this.props.editor.change(TablePlugin.changes.removeColumn);
  }

  removeRow = () => {
    this.props.editor.change(TablePlugin.changes.removeRow);
  }

  removeTable = () => {
    this.props.editor.change(TablePlugin.changes.removeTable);
  }

  setAlign = (align, e) => {
    e.preventDefault();
    this.props.editor.change(change =>
      alignPlugin.changes.setColumnAlign(change, align)
    );
  }

  render() {
    const { attributes, children } = this.props;
    const { value } = this.props.editor.props;
    const isInTable = TablePlugin.utils.isSelectionInTable(value);
    return (
      <div>
        {!this.props.editor.props.readOnly && !isInTable ?
          null
          :
          <div className='tableButton'>
            <Button.Group size={'small'}>
              <Button disabled>按CMD/CTRL+ENTER退出编辑</Button>
              <Button onClick={this.insertColumn}>插入列</Button>
              <Button onClick={this.insertRow}>插入行</Button>
              <Button onClick={this.removeColumn}>删除列</Button>
              <Button onClick={this.removeRow}>删除行</Button>
              <Button onClick={this.setAlign.bind(this, 'left')}>左对齐</Button>
              <Button onClick={this.setAlign.bind(this, 'right')}>右对齐</Button>
              <Button onClick={this.setAlign.bind(this, 'center')}>居中对齐</Button>
              <Button type="danger" onClick={this.removeTable}>删除表格</Button>
            </Button.Group>
          </div>
        }
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { attributes, children } = this.props;
    return <tr {...attributes}>{children}</tr>;
  }
}

class TableCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { attributes, children, node } = this.props;

    const textAlign = node.get('data').get('align', 'left');

    return (
      <td style={{ textAlign }} {...attributes}>
        {children}
      </td>
    );
  }
}

export { Table, TableRow, TableCell };