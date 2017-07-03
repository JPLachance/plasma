import { TableEmptyRow } from '../TableEmptyRow';
import * as React from 'react';

export class TableEmptyRowExamples extends React.Component<any, any> {

  render() {

    return (
      <div className='mt2'>
        <div className='form-group'>
          <label className='form-control-label'>Table with no rows</label>
          <table className='mod-collapsible-rows'>
            <thead>
              <tr>
                <th>First column</th>
                <th>Second column</th>
                <th>Third column</th>
              </tr>
            </thead>
            <TableEmptyRow text='No matching rows found' nbColumns={3} />
          </table>
        </div>
      </div>
    );
  }
}
