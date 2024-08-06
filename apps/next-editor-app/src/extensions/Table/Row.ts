import { TableRow as SlaykitTableRow } from '@slaykit/table'

export const TableRow = SlaykitTableRow.extend({
  allowGapCursor: false,
  content: 'tableCell*',
})

export default TableRow
