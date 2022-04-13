import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBare from "./SideBar";
import Categorie from "./Categorie";
import CreePost from "./PosteCreator";
import Fichier from "./Fichier";
import Vote from "./Vote";
import Statut from "./Statut";
import PosteList from "./PosteList";
import getCase, {
  getCategories,
  getStatuts,
  getVote,
  getResults,
} from "../ApiDetailDossier/ApiPosts";
import "./index.css";

function App() {
  const [results, setresult] = useState([]);
  const [posts, setposts] = useState([]);
  const [choix, setChoix] = useState([]);
  let test = [];
  let choixCopys = [];

  useEffect(() => {
    async function getdata() {
      const Case = await getCase();
      console.log(Case);
      Case.notes.map((n) => {
        test.push(n);
      });
      Case.votes.map((v) => {
        test.push(v);
      });

      var str;
      for (var i = 0; i < test.length; i++) {
        for (var j = i; j < test.length; j++) {
          if (new Date(test[i].creationDate) > new Date(test[j].creationDate)) {
            str = test[i];
            test[i] = test[j];
            test[j] = str;
          }
        }
      }

      const Results = await getResults();
      setresult(Results);

      const Categories = await getCategories();
      setCategories(Categories);

      const Statuts = await getStatuts();
      setStatut(Statuts);

      const Votes = await getVote();
      Votes.map((vote) => {
        vote.choices.map((choi) => {
          choixCopys.push(choi);
        });
      });

      setposts(test);
      setChoix(choixCopys);
    }
    getdata();
  }, [setposts]);

  const [input, setInput] = useState("");

  /*for  Statut ----------------------------*/

  const [Statuts, setStatut] = useState([]);

  async function onChangeStatut(e) {
    const cases = await getCase();
    console.log(cases);
    let idStatut = null;
    Statuts.map((statut) => {
      if (statut.statusName == e.target.value) {
        fetch("http://localhost:5052/api/Case/" + 1, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            idCase: cases.idCase,
            title: cases.title,
            description: cases.description,
            creationDate: cases.creationDate,
            category: cases.category,
            status: statut.idStatus
          }),
        }).then((response) => {
          console.log(response);
          if (response.status == 200) {
            console.log("success");
          }
        });
        console.log(statut.idStatus, statut.statusName);
      }
    });
  }

  /*for creer  Fichier ----------------------------*/

  const [changeFichier, setChangeFichier] = useState([]);
  const [nouveauFichier, setNouveauFichier] = useState([
    {
      _file: null,
      type: "Fichier",
      idCase: 1,
    },
  ]);
  function handleChangeFichier(e) {
    setNouveauFichier({ ...nouveauFichier, _file: e.target.files[0] });
  }

  function handeCreateFichiert(e) {}
  /* for Categorie ----------------------------*/
  const [Categories, setCategories] = useState([]);

  async function onChangeCategorie(e) {
    const cases = await getCase();
    let idCategorie = null;
    Categories.map((Categorie) => {
      if (Categorie.categoryName == e.target.value) {
        idCategorie = Categorie.idCategorie;
      }
    });
    console.log(idCategorie);
    fetch("http://localhost:5052/api/Case/" + 1, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        idCase: cases.idCase,
        title: cases.title,
        description: cases.description,
        creationDate: cases.creationDate,
        category: idCategorie,
        status: cases.status,
      }),
    }).then((response) => {
      console.log(response);
      if (response.status == 200) {
        console.log("success");
      }
    });
  }

  /* code for create vote ----------------------------*/

  const [currentChoix, setcurrentChoix] = useState({
    idChoice: null,
    choice: "",
  });
  const [nouveauChoix, setNouveauChoix] = useState([]);

  function changeCreerChoix(e) {
    setcurrentChoix({
      ...currentChoix,
      choice: e.target.value,
      idChoice: Math.floor(Math.random() * 10000),
    });
    console.log(currentChoix.choice);
  }

  function ClickCreerChoix() {
    setcurrentChoix({
      ...currentChoix,
      idChoice: Math.floor(Math.random() * 100000000000000),
    });
    setNouveauChoix([...nouveauChoix, currentChoix]);
    console.log(nouveauChoix);
  }

  function handlSupprChoix(choix) {
    setNouveauChoix(
      nouveauChoix.filter((choi) => choi.idChoice != choix.idChoice)
    );
  }
  const [titreVote, setTitreVote] = useState("");
  function onChoncheTitre(e) {
    setTitreVote(e.target.value);
    console.log(titreVote);
  }

  function handleCreerVote() {
    nouveauChoix.map((choi) => {
      choix.push(choi);
      console.log(choix);
    });
    console.log(choix);
    setposts([
      ...posts,
      {
        id: posts.length + 1,
        title: "hhhh",
        id_vote: 7,
        id_dossier: 8,
        date: 555,
        type: "vote",
      },
    ]);
    console.log(posts);

    fetch("http://localhost:5052/api/Vote", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: titreVote,
        type: "vote",
        idCase: 1,
        choices: nouveauChoix,
      }),
    }).then((response) => {
      console.log(response);
      if (response.status == 200) {
        console.log("success");
      }
    });
    setNouveauChoix([]);
  }

  return (
    <>
      <Header />

      <SideBare />
      <div id="content">
        <div id="flexx">
          <div id="cs">
        <Categorie Categories={Categories} onchange={onChangeCategorie} />
        <Statut Statuts={Statuts} onChange={onChangeStatut} />
        </div>
        <div id="FV">
        <Fichier onChange={handleChangeFichier} onClick={handeCreateFichiert} />

        <Vote
          nouveauChoix={nouveauChoix}
          onChange={changeCreerChoix}
          onClick={ClickCreerChoix}
          onSupprime={handlSupprChoix}
          onCreer={handleCreerVote}
          onChoncheTitre={onChoncheTitre}
          posts={posts}
        />
        </div>
        </div>
        
        <div className="postessimo">
          <PosteList
            posts={posts}
            setposts={setposts}
            choix={choix}
            setChoix={setChoix}
            results={results}
          />
        </div>
        <CreePost
          input={input}
          setInput={setInput}
          posts={posts}
          setposts={setposts}
        />
      </div>
    </>
  );
}

export default App;
