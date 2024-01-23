const geеСoordinatesClue = (refClue, parentClue) => {
  const clue = refClue.current?.getBoundingClientRect();
  const parent = refClue.current?.closest(parentClue).getBoundingClientRect();
  const widthWindow = document.documentElement.clientWidth;
  let top;
  let left;
  if (parent.top > clue.height) {
    top = -clue.height - 5;
  } else {
    top = parent.height + 5;
  }

  if (widthWindow - parent.left < clue.width) {
    left = -clue.width - 5;
  } else {
    left = parent.width + 5;
  }

  return { top, left };
};

export { geеСoordinatesClue };
