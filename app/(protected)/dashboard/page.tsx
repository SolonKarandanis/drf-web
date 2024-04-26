const Page = () => {
  const olderDate = new Date('2022-10-31');
  const currentDate = new Date('2022-11-01');

  const diff = olderDate.valueOf()- currentDate.valueOf()
  const formatter = new Intl.RelativeTimeFormat('en', { 
    numeric: 'always' 
  });
  const d=formatter.format(Math.round(diff / 86400000), 'day')
  return (
    <div>
      
      {d}
    </div>
  )
}

export default Page