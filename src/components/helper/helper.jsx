function ConvertDataToSendLineMsg(products) {
    const confirmedProducts = products
      .filter((p) => p.isConfirmed)
      .map((p) => {
        return {
          item: p.isConfirmed ? "ของหมด" : "ไม่ขาด",
          status: `${p.name} ${
            p.isConfirmed == true && p.unit
              ? `เอา ${p.quantity} ${p.unit} `
              : `${p.quantity} จำนวน`
          }`,
        };
      });

    return confirmedProducts
}

  function clearTiem() {
    setProducts(
      products.map((p) => ({ ...p, isConfirmed: false, quantity: 1, unit: "" }))
    );
    setModalIsOpen(false);
}
function getAllowedUnits(id) {
    const allowedUnitsMap = {
      "ถุง": [1,2,4,11,16,27,29,30,31,32,33,34],
      "แพ็ค": [36,19],
      "กรัม": [7],
      "ขีด": [10],
      "ขวด": [20,21,22,26,28,35],
      "โล":[12,13,14,15,7,8,9,10,25,30,31,32],
      "ครึ่งโล":[12,13,14,15,7,8,9,10,25,30,31,32],
      "ชิ้น":[3],
      "ซอง":[5,6],
      "กล่อง":[18],
      "โหล":[17,18],
      "ถัง":[23],
      "กรีบ/หัว":[25],
      "อื่นๆ":[]
    };
  
    return Object.entries(allowedUnitsMap)
    .filter(([unit, products]) => products.includes(id))
    .map(([unit]) => unit);
}


export {
    ConvertDataToSendLineMsg,
    
    getAllowedUnits
};
