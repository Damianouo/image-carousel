const arraa = [
  { url: 'sssss', name: '11111' },
  { url: 'dddd', name: '2222' },
  { url: 'ffff', name: '33333' },
  { url: 'gggg', name: '44444' },
  { url: 'qqqq', name: '55555' },
  { url: 'wwww', name: '6666' },
];

const try1 = () => {
  arraa.push(arraa[0]);
  arraa.unshift(arraa[arraa.length - 2]);
  console.log(arraa);
};

try1();
