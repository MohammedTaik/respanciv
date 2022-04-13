import React from "react";
import "./Modal.css";
function ModalVote({ setopen ,nouveauChoix ,onChange ,onClick ,onSupprime ,onCreer ,onChoncheTitre}) {
 

  return (
    <>
      <div class="modalBackground">
        <div className="modalContainerVote">
          <div className="Cree">
            <h1>Creer un Vote</h1>
          </div>
          <label className="TitreVote">Titre</label>
          <input type="text" class="inputTitreVote" onChange={onChoncheTitre}/>
          <br />
          <label className="ChoixVote">Choix</label>
          <input type="text" class="inputChoix" maxlength="20" onChange={onChange}/>
          <button className="btn-ajoute-choix" onClick={() =>{onClick() }}>Ajoute Choix</button>
    
          <br />
          <br />


          <div className="choixContainer">

              {nouveauChoix.map(function(n) {
                  return <div className="backgroundChoix">
                  <p className="choixP">{n.choice}</p>
                   <img src="../image/cancel.png" className="deletChoix"  onClick={() =>{onSupprime(n) }}/>
                 </div>
              })}
              
          </div>
          
          <button className="btn-Creer-vote" onClick={() => {
            setopen(false);
             onCreer();}}>
            {" "}
            Creer{" "}
          </button>
          

        </div>
      </div>
    </>
  );
}

export default ModalVote;
