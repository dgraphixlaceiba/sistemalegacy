exports.calculate = (req,res) => {
  const { materialsCost, laborCost, overheadPct, marginPct } = req.body;
  const totalCost = materialsCost + laborCost + (materialsCost+laborCost)*(overheadPct/100);
  const price = totalCost * (1 + marginPct/100);
  res.json({ totalCost, price });
};