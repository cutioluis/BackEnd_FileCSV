var request = require("request-promise");

var secretFiles = [];
var URL_CLIENT = "https://echo-serv.tbxnet.com/v1/secret/";

const getFilesCsvByName = async (nameScretFie) => {
  try {
    const contentFile = await request(
      {
        url: `${URL_CLIENT}file/${nameScretFie}/`,
        headers: {
          Authorization: "Bearer aSuperSecretKey",
        },
        rejectUnauthorized: false,
      },
      function (err, res) {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
    return contentFile;
  } catch (error) {
    return (contentFile = null);
  }
};

const getHello = () => {
  return "Hello";
};

/* Funcitoin resquest CSV FILES */
const requestCsv = async () => {
  const secretFilesList = await request(
    {
      url: `${URL_CLIENT}files/`,
      headers: {
        Authorization: "Bearer aSuperSecretKey",
      },
    },

    function (err, res) {
      if (err) {
        console.error(err);
      } else {
        secretFiles = res.body;
      }
    }
  );
  return secretFilesList;
};

/* ------------------------------------------------------ */

const getSecretFilesFromApi = async () => {
  secretFiles = await requestCsv();
  const objFiles = JSON.parse(secretFiles);

  console.log("Formateando datos --------------------");

  var contentFilesCsvArray = [];

  for (const file of objFiles.files) {
    let resContentFile = await getFilesCsvByName(file);
    if (resContentFile !== null) {
      let objFileContent = formatDataCsv(resContentFile);
      const contentFilesCsvObject = {};
      contentFilesCsvObject.file = file;
      contentFilesCsvObject.lines = objFileContent ? objFileContent : [];
      contentFilesCsvArray.push(contentFilesCsvObject);
    } else {
      console.log(`Error al obtener el contenido del archivo ${file}`);
    }
  }
  return contentFilesCsvArray;
};

const formatDataCsv = (data) => {
  const resultCsvLines = [];
  const splitLines = (str) => str.split(/\r?\n/);

  console.log(splitLines(data));
  splitLines(data).map((line, i) => {
    if (i > 0) {
      var atribute = line.split(",");
      resultCsvLines.push(getObjectLine(atribute));
    }
  });

  return resultCsvLines;
};

const getObjectLine = (objectLine) => {
  const object = {};
  objectLine.map((line, i) => {
    switch (i) {
      case 1:
        object.text = line ? line : "";
        break;
      case 2:
        object.number = line ? line :"";
        break;
      case 3:
        object.hex = line ? line : "";
        break;
      default:
        break;
    }
  });

  return object;
};

/* ------------------------------------------------------ */

module.exports = {
  index: function (req, res) {
    res.send(getHello());
  },
  requestCsv: function (req, res) {
    res.send(requestCsv());
  },
  requestCsvByName: function (req, res) {
    res.send(getFilesCsvByName());
  },
  getSecretFilesFromApi: async function (req, res) {
    res.send(await getSecretFilesFromApi());
  },
};
