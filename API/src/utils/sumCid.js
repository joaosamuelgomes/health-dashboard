function sumCid(data) {
  const totalCid = {};
  data.forEach((item) => {
    const cid = item.cd_descr;
    if (cid in totalCid) {
      totalCid[cid]++;
    } else {
      totalCid[cid] = 1;
    }
  });
  return totalCid;
}

module.exports = {
  sumCid,
};
