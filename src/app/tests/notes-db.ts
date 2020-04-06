export const NOTES = [
  {
    title: null,
    _id: '5e81b36d50b35125fc9ded6b',
    text: 'это тестовая заметка без заголовка',
    date: new Date('2020-03-30T08:53:01.154Z'),
    userId: '5e39158f712c5c2056e6e743'
  },
  {
    title: 'а это ее заголовок',
    _id: '5e81b38650b35125fc9ded6c',
    text: 'это тестовая заметка с заголовком',
    date: new Date('2020-03-30T08:53:26.925Z'),
    userId: '5e39158f712c5c2056e6e743'
  },
  {
    title: null,
    _id: '5e81b3a850b35125fc9ded6d',
    text: 'это еще одна тестовая заметка чтобы была',
    date: new Date('2020-03-30T08:54:00.736Z'),
    userId: '5e39158f712c5c2056e6e743'
  }
];

export function getNotes(index?: number): any {
  const notes = NOTES.concat([]);
  return typeof index === 'number' ? notes[index] : notes;
}
