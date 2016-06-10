var matriz = new Array([],[]);
var iteracoes;
var prodqtd;
var maqqtd;
function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}
function limpaTabela()
{
	var table = document.getElementById("tblin");
		table.innerHTML = "";
}
function criaTabela(prodqtd,maqqtd)
{

		var b,c;
		var table = document.getElementById("tblin");
		table.innerHTML = "";
		for(b=0;b<maqqtd;b++)
		{
			var row = table.insertRow(b);
			row.innerHTML = "Máquina " + (b+1);
			for(c=0;c<prodqtd;c++)
			{		var cell = row.insertCell(c);
					cell.innerHTML = '<input type="checkbox" id="p'+(c+1) +'m'+(b+1)+'">';

			}
		}
		var head = table.insertRow(0);
			for(c=0;c<prodqtd;c++)
		{
			var cell1 = head.insertCell(c);
			cell1.innerHTML = "P"+(c+1);
		}
		cell1 = head.insertCell(0);
		cell1.innerHTML = "VHDL";
}

function Magica()
{
	// Tentando pegar entradas
        prodqtd = document.getElementById("prodtxt").value;
        maqqtd = document.getElementById("maqtxt").value;
	// Verificando se as entradas são válidas
	if(!isInt(prodqtd) || !isInt(maqqtd)){
		alert("Insira apenas entradas válidas (numérica).");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	if(prodqtd<=0 || maqqtd<=0)
	{
		alert("Insira apenas números válidos (maior do que 0).");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	else if(prodqtd>=45 || maqqtd>=45)
	{
		alert("Por limitações computacionais, entre com uma matriz de até 45x45");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	document.getElementById("entradas").style.display = "none"; // OCULTA INPUT FIELDS
 	document.getElementById("bnt2").style.display = "inline"; // E MOSTRA BT2
  document.getElementById("bnt3").style.display = "inline";
	criaTabela(prodqtd,maqqtd);
}

function Magica2()
{
//	 alert("Chama funcao calcular do codigo.js");
   lerMatriz();
   document.getElementById("resultado").style.display = "inline";
   iteracoes = 0;
   roc();

	 /*if (confirm('Gostaria de tentar com outra entrada?')) {
		document.getElementById("entradas").style.display = "initial"; // OCULTA INPUT FIELDS
		document.getElementById("bnt2").style.display = "none";
		limpaTabela();
}	 else {
		window.location.href = "obrigado.html";
}*/
}

function lerMatriz()
{
    var a,b;
    matriz = new Array();
    for(b=0;b<prodqtd;b++){
        matriz[b] = new Array();
        for(a=0; a<maqqtd;a++)
        {
            if ($("#p"+(b+1)+"m"+(a+1)).is(":checked"))
                matriz[b][a] = 1;
            else
                matriz[b][a] = 0;
        }
    }
    matriz[prodqtd] = new Array();
    matriz[+prodqtd+1] = new Array();
    for(b=0;b<prodqtd;b++)
      matriz[b][maqqtd] = b; // Definiu os prods ids
    for(a=0; a<maqqtd;a++)
      matriz[prodqtd][a] = a; // Definiu os maqs ids
}

function gerarMatrizcna()
{

}

function imprimeMatriz(matriz_arg,destino)
{
  iteracoes++;
  document.getElementById(destino).innerHTML += "A matriz ficará assim na "+iteracoes+"ª iteração: <br /><table id ='ite"+iteracoes+"'> </table>";
  var table = document.getElementById("ite"+iteracoes);
  for(b=0;b<maqqtd;b++)
  {
    var row = table.insertRow(b);
    row.innerHTML = "Máquina " + (b+1);
    for(c=0;c<prodqtd;c++)
    {		var cell = row.insertCell(c);
        cell.innerHTML = '<input type="checkbox" id="p'+(c+1) +'m'+(b+1)+'i'+iteracoes+'">';
        if(matriz_arg[c][b]==1)
          $('#p'+(c+1) +'m'+(b+1)+'i'+iteracoes+'').prop('checked', true);
    }
  }
  var head = table.insertRow(0);
    for(c=0;c<prodqtd;c++)
  {
    var cell1 = head.insertCell(c);
    cell1.innerHTML = "P"+(c+1);
  }
  cell1 = head.insertCell(0);
  cell1.innerHTML = "VHDL";

}
function roc()
{
    var matriz_aux = new Array([],[]);
    //imprimeMatriz(matriz_aux, "roc");
    copiarMatrizes(matriz, matriz_aux, prodqtd,maqqtd);
    somarLinhas(matriz_aux, prodqtd, maqqtd);
    ordenaMatrizLinhas(matriz_aux, prodqtd, maqqtd);
    somarColunas(matriz_aux, prodqtd, maqqtd);
    ordenaMatrizColunas(matriz_aux, prodqtd, maqqtd);

    if(!compararMatrizes(matriz, matriz_aux, i,j)) // Se tem que fazer mais iteracoes
    {
        copiarMatrizes(matriz_aux,matriz, prodqtd, maqqtd);
        roc();
    }
}
function compararMatrizes(matriz1, matriz2)
{
    var b,c;
    for(b=0;b<prodqtd;jb++)
        for(c=o;c<maqqtd;c++)
            if(matriz1[b][c]!==matriz2[b][c])
                return 0;
    return 1;
}

function somarLinhas(matriz_arg)
{
	var a,b,c;
    
	for(a=0; a<prodqtd; a++){
		matriz_arg[a][+maqqtd+1] = 0;
	}
	
	for(a=0;a<prodqtd;a++){
    	c=1;
    	for(b=+maqqtd-1;b>=0;b++){
        	matriz_arg[a][+maqqtd+1] += ((matriz_arg[a][b])*c);
        	c *= 2;
      	}
   }
}

function somarColunas(matriz_arg)
{
  var a,b;
  for(a=0; a<maqqtd; a++){
		matriz_arg[+prodqtd+1][a] = 0;
	}
	
	for(b=0; b<maqqtd; b++){
	c=1;
		for(a=+prodqtd-1; a>=0; a--){
			matriz_arg[+prodqtd+1][b] += ((matriz_arg[a][b])*c);
			c *= 2;
		}
	}
}

// Dada uma matriz de I produtos e J máquinas, onde no slot i,j temos o número do produto/máquina
// e no slot i+1, j+1 temos os slots destinado para as somas




function copiarMatrizes(matriz1, matriz2)
{
	var a,b;
	
	for(a=0; a<prodqtd; a++){
		for(b=0; b<maqqtd; b++){
			matriz2[a][b] = matriz1[a][b];
		}
	}
}

function ordenaMatrizLinha(matriz_arg)
{
    var a, b, c, aux;
    
    for(a=0; a<prodqtd; a++){
		for(b=+a+1; b<+prodqtd-1; b++){
			if(matriz_arg[a][+maqqtd+1] < matriz_arg[b][+maqqtd+1]){
				for(c=0; c<=+maqqtd+1; c++){
					aux=matriz_arg[a][c];
					matriz_arg[a][c]=matriz_arg[b][c];
					matriz_arg[b][c]=aux;
				}
			}
		}
	}
}

function ordenaMatrizColuna(matriz_arg)
{
  	var a, b, c, aux;
  	
  	for(a=0; a<maqqtd; a++){
		for(b=+a+1; b<+maqqtd-1; b++){
			if(matriz_arg[+prodqtd+1][i] < matriz_arg[+prodqtd+1][j]){
				for(c=0; c<=+prodqtd+1; c++){
					aux=matriz_arg[c][b];
					matriz_arg[c][b]=matriz_arg[c][a];
					matriz_arg[c][a]=aux;
				}
			}
		}
	}
}
/*
function ordenar(vetor,i,j)
{
    var min,c, aux;
    if(i<j)
    {
        min = i;
        for(c=i+1; c<j;c++)
            if(vetor[i]<vetor[min])
                min = i;
        aux = vetor[i]; // A troca aqui seria a linha toda e não só um elemento
        vetor[i] = vetor[min]; //idem, forzinho
        vetor[min] = i; //idem
        ordenaVetor(vetor, ++i,j);
    }
}
*/
