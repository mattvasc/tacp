var matriz;
var matrizb;
var iteracoes;
var prodqtd;
var maqqtd;
function roc()
{
    var matriz_aux;

    matriz = somarLinhas(matriz);
	matriz_aux = copiarMatrizes(matriz, matriz_aux);
	matriz_aux = ordenaMatrizLinhas(matriz_aux);
	
	if(!compararMatrizes(matriz, matriz_aux)) // Se tem que fazer mais iteracoes
    {
        matriz = copiarMatrizes(matriz_aux,matriz); // origem, destino
        imprimeMatriz(matriz_aux, "roc");
		return matriz_aux;
	}
	
    matriz = somarColunas(matriz_aux);
	matriz_aux = copiarMatrizes(matriz, matriz_aux);
	matriz_aux =  ordenaMatrizColunas(matriz_aux);
	
    if(!compararMatrizes(matriz, matriz_aux)) // Se tem que fazer mais iteracoes
    {
        matriz = copiarMatrizes(matriz_aux,matriz); // origem, destino
        imprimeMatriz(matriz_aux, "roc");
        roc();
    }

}
/*function cna()
{
  gerarMatrizcna();
}
*/
function lerMatriz() // FULL OK
{
    var a,b;
    matriz = [];
    for(b=0;b<prodqtd;b++){
        matriz[b] = [];
        for(a=0; a<(+maqqtd+2);a++)
        {
          if(a>=maqqtd)
          {
            matriz[b][a] = 0;
          }
          else
            if ($("#p"+(b+1)+"m"+(a+1)).is(":checked"))
                matriz[b][a] = 1;
            else
                matriz[b][a] = 0;
        }
    }
    matriz[prodqtd] = []; // Criando slot para id
    matriz[(+prodqtd+1)] = []; // Criando slot para soma
    for(b=0;b<prodqtd;b++)
      matriz[b][maqqtd] = b; // Definiu os prods ids
    for(a=0; a<maqqtd;a++){
      matriz[prodqtd][a] = a; // Definiu os maqs ids
      matriz[+prodqtd+1][a] = 0; // Definiu as pré-somas
    }
    matriz[prodqtd][a] = 0; matriz[prodqtd][+a+1] = 0; // Definindo como 0 as quinas da lixeira
    matriz[(+prodqtd+1)][a] = 0;matriz[(+prodqtd+1)][+a+1] = 0;
}

function gerarMatrizcna()
{
  matrizb = [];
  var a,b,c,cont;
  for(a=0;a<maqqtd;a++){ // Criando a matriz em O(maq²);
      matrizb[a] = [];
      for(b=0;b<maqqtd;b++)
          matrizb[a][b] = a===b ? NaN : 0; // Linha de ouro, usei um operador ternário
  }
  matrizb[++a] = []; // Criando slot forçado para salvar o resultado das somas.
  for(a=0; a<maqqtd; a++){
		for(b=0; b<maqqtd; b++){
			if(a!=b){
				cont = 0;
				for(c=0; c<prodqtd; c++){
					if(matriz[a][c] == 1 && matriz[b][c] == 1){
						cont++;
					}
				}
				matrizb[a][b]=cont;
				matrizb[a][maqqtd] = matrizb[a][maqqtd] + cont;
			}
			else{
				matrizb[b][a]='-';
			}
		}
	}
}

/*  --PARA A PRIMEIRA LINHA A SER ORDENADA:
	PARA A MAIOR SOMA[i], DESLOCAR LINHA i INTEIRA PARA i = 0 (ou seja, para a primeira linha)... 
	se tiver duas somas de valor igual, deslocar a que tiver menor indice i
	
	--PARA AS DEMAIS LINHAS A SEREM ORDENADAS:
	IDENTIFICA MAIOR VALOR DA LINHA i (recém deslocada), PARA O MAIOR VALOR, PEGAR SEU INDICE DE COLUNA j 
	E TRABALHAR NA LINHA DESSE INDICE... se por acaso, houver mais de uma linha a ser escolhida, 
	escolher a de maior soma. Se as somas forem iguais, escolher a que possui menor indice i
	
	--DEPOIS DISSO TEM AS DIVISÕES DE MATRIZ QUE DAI É OUTRO DEMONHO*/


function imprimeMatriz(matriz_arg,destino)
{
  iteracoes++;
  document.getElementById(destino).innerHTML += "A matriz via "+destino+" ficará assim na "+iteracoes+"ª iteração: <br /><table border='1' id ='ite"+iteracoes+"'> </table>";
  var table = document.getElementById("ite"+iteracoes);
  for(b=0;b<maqqtd;b++)
  {
    var row = table.insertRow(b);
    row.innerHTML = "Máquina " + (matriz_arg[prodqtd][b]+1);
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
    cell1.innerHTML = "P"+(matriz_arg[c][maqqtd]+1);
  }
  cell1 = head.insertCell(0);
  cell1.innerHTML = "ACP";

}

function compararMatrizes(matriz1, matriz2)
{
    var b;
    for(b=0;b<prodqtd;b++) // Só olha os IDS
      if(matriz1[b][maqqtd]!=matriz2[b][maqqtd])
                return 0;
    for(b=0;b<maqqtd;b++) // Só olha os IDS
      if(matriz1[prodqtd][b]!==matriz2[prodqtd][b])
        return 0;
    return 1;
}

function somarLinhas(matriz_arg)
{
	var a,b,c;
  // Zerando os valores da soma anterior
	for(a=0; a<prodqtd; a++){
		matriz_arg[a][+maqqtd+1] = 0;
	}
  // Calculando a soma
	for(a=0;a<maqqtd;a++){
    	c=1;
    	for(b=(+prodqtd-1);b>=0;b--){
        	matriz_arg[+prodqtd+1][a] += ((matriz_arg[b][a])*c);
        	c *= 2;
      	}
   }
   return matriz_arg;
}

function somarColunas(matriz_arg)
{
  var a,b,c;
  //Zerando o valor das somas anteriores
  for(a=0; a<maqqtd; a++){
		matriz_arg[+prodqtd+1][a] = 0;
	}

  //Calculando a soma
	for(a=0; a<prodqtd; a++){
	c=1;
		for(b=(+maqqtd-1); b>=0; b--){
			matriz_arg[a][+maqqtd+1] += ((matriz_arg[b][a])*c);
			c *= 2;
		}
	}
}

function copiarMatrizes(matriz1, matriz2) // ORIGEM, DESTINO
{
	var a,b;
  matriz2 = []; // Faltou essa linha
	for(a=0; a<(+prodqtd+2); a++){
    matriz2[a] = []; // E essa também
		for(b=0; b<(+maqqtd+2); b++){
			matriz2[a][b] = matriz1[a][b];
		}
	}
  return matriz2;
}

function ordenaMatrizLinhas(matriz_arg)
{
  matriz_arg = ordenaLinhaRecursiva(matriz_arg, 0);
  return matriz_arg;
}

function ordenaMatrizColunas(matriz_arg)
{
  matriz_arg = ordenaColunaRecursiva(matriz_arg, 0);
  return matriz_arg;
}


function ordenaLinhaRecursiva(matriz_arg, indice)
{
  if(indice<(+maqqtd-1))
  {
    var a, max, aux1, aux2;
    max = indice;
    for(a=(+indice+1); a<+maqqtd;a++) // Para todas as maquinas
    {
      if( matriz_arg[+prodqtd+1][a] > matriz_arg[+prodqtd+1][max])
        max = a;
    }
    if(max!==indice)
    {
      for(a=0;a<+prodqtd+2;a++) // Copiando a linha inteira
      {
        aux1 = matriz_arg[a][max];
        aux2 =  matriz_arg[a][indice]; // Só criei isso pq sou noob em javascript
        matriz_arg[a][max] = aux2;
        matriz_arg[a][indice] = aux1;
      }
    }
    matriz_arg = ordenaLinhaRecursiva(matriz_arg, ++indice);
  }
    return matriz_arg;
}

function ordenaColunaRecursiva(matriz_arg, indice)
{
  if(indice<(+prodqtd-1))
  {
    var a, max, aux1, aux2;
    max = indice;
    for(a=(+indice+1); a<prodqtd;a++)
    {
      if( matriz_arg[a][+maqqtd+1] > matriz_arg[max][+maqqtd+1])
        max = a;
    }
    if(max!==indice)
    {
      for(a=0;a<+maqqtd+2;a++)
      {
        aux1 = matriz_arg[max][a];
        aux2 =  matriz_arg[indice][a]; // Só criei isso pq sou noob em javascript
        matriz_arg[max][a] = aux2;
        matriz_arg[indice][a] = aux1;
      }
    }
    matriz_arg = ordenaColunaRecursiva(matriz_arg, ++indice);
  }
    return matriz_arg;
}

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
   //cna();
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
					cell.onclick = $( "#p"+(c+1) +"m"+(b+1) ).prop( "checked", true );
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
		cell1.innerHTML = "ACP";
}
