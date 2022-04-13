import React from "react";

function Categorie({ Categories, onchange }) {
  return (
    <>
      <form>
        <select aria-label="State" className="combo" id="comboCategorie" onChange={onchange}>
          <option value="Select" >Categories</option>
          {Categories.map((Categorie) => {
            return <option>{Categorie.categoryName}</option>;
          })}
        </select>
      </form>
    </>
  );
}
export default Categorie;
