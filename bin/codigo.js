var matriz;
var matrizb;
var iteracoes;
var prodqtd;
var maqqtd;
var cellqtdCNA;
var cellqtdROC;
var total=0;
function roc()
{
    var matriz_aux;

    	matriz_aux = copiarMatrizes(matriz, matriz_aux);
    	matriz_aux = somarLinhas(matriz_aux);
		matriz_aux = ordenaMatrizLinhas(matriz_aux);
    	matriz_aux = somarColunas(matriz_aux);
		matriz_aux =  ordenaMatrizColunas(matriz_aux);

    if(!compararMatrizes(matriz, matriz_aux)) // Se tem que fazer mais iteracoes
    {
        matriz = copiarMatrizes(matriz_aux,matriz); // origem, destino
        roc();
    }

}

function fazerCna()
{
//  maqqtd = 8;
//  prodqtd = 20;
  matrizb = [];
  var i, j, k, cont, maior, indice, aux,
  sai, segundo_indice, indice1, indice_inicio = 0, linhas,
  		seq1 = [], seq2 = [], descarta,
      matrizAux = [], soma=[];
  		result_linha = [], result_coluna = [];
      /*matrizcna= [
      [0,0,0,0,1,1,0,0,0],
      [1,0,1,0,0,0,0,0,1],
      [1,1,0,1,0,0,1,1,2],
      [0,1,0,1,0,0,1,1,3],
      [0,0,0,0,1,1,0,0,4],
      [0,1,0,1,1,0,1,1,5],
      [0,1,0,1,0,0,1,1,6],
      [1,0,1,0,0,0,0,0,7],
      [1,0,1,0,0,1,0,0,8],
      [0,0,0,1,1,1,0,0,9],
      [1,0,1,0,0,0,1,0,10],
      [0,0,0,0,1,1,1,0,11],
      [1,0,1,0,0,0,0,0,12],
      [1,1,1,0,0,0,0,0,13],
      [0,0,0,0,1,1,0,0,14],
      [1,0,1,0,0,0,0,0,15],
      [1,0,1,0,1,0,0,0,16],
      [0,1,0,1,0,0,1,1,17],
      [1,0,1,0,0,0,0,0,18],
      [0,1,0,1,0,1,1,1,19],
      [0,1,2,3,4,5,6,7,0]];*/

  	//inicializacoes de vetores
  	for (i=0; i< maqqtd; i++) {
  		result_linha[i] = -1;
  		soma[i] = 0;
      matrizb[i] = [];
  	}
  	for (i=0; i<+prodqtd+1; i++){
  		result_coluna[i] = -1;
      matrizAux[i] = [];
    }

  	//fazer matriz b
  	for(i=0; i<maqqtd; i++){
  		for(j=0; j<maqqtd; j++){
  			if(i!=j){
  				cont = 0;
  				for(k=0; k<prodqtd; k++){
  					if(matrizcna[k][i] == 1 && matrizcna[k][j] == 1){
  						cont++;
  					}
  				}
  				matrizb[i][j]=cont; // Me inicialize
  				soma[i]=soma[i] + cont;
  			}
  			else{
  				matrizb[i][j]=' ';
  			}
  		}
  	}



  	//ORDENAR AS LINHAS DE B (ETAPA 1 DO SLIDE)
  	//ver primeira linha
  	maior = soma[0];
  	for (i=0; i< maqqtd; i++){
  		if(maior < soma[i])
  		{
  			maior = soma[i];
  			indice = i;
  		}
  	}
  	result_linha[0] = indice;

  	//ver proximas linhas (resto)
  	for (j=1; j<maqqtd; j++)
  	{
  		//inicializar se o 1o nao for nulo ou ja foi
  		sai = 0;
  		for (k =0, i = 0 ; (k < maqqtd) || (sai != 1); k++)
  		{
  			if(i == result_linha[k])
  			{
  				i++;
  				k=0;
  			}
  			else
  				sai = 1;
  		}
  		if (matrizb[indice][i] != 32)
  		{
  			maior = matrizb[indice][i];
  			segundo_indice = i;
  			indice1=i;
  			i++;
  		}
  		else
  		{
  			maior = matrizb[indice][+i+1];
  			segundo_indice = +i+1;
  			indice1 = +i+1;
  			i+=2;
  		}

  		for (; i< maqqtd; i++){
  			//ver se ja foi essa linha
  			sai = 0;
  			for (k =0 ; k< maqqtd; k++)
  			{
  				if(i == result_linha[k])
  					sai=1;
  			}

  			if((maior <= matrizb[indice][i]) && (matrizb[indice][i] != 32) && (sai != 1))
  			{
  				if (maior == matrizb[indice][i])
  				{
  						if (indice1 > i)
  						{
  							segundo_indice = i;
  						}
  						else
  						{
  							segundo_indice = indice1;
  						}
  				}
  				else
  				{
  					maior = matrizb[indice][i];
  					indice1 = i;
  					segundo_indice = i;
  				}
  			}
  		}
  		indice = segundo_indice;
  		result_linha[j] = indice;
  	}

  	//matriz I ordenada (matrizAux)
  	for (i=0; i<maqqtd; i++)
  	{
  		for (j=0; j<prodqtd; j++)
  		{
  			matrizAux[j][i] = matrizcna[j][result_linha[i]]; // Me inicialize?
  		}
  	}

  	/*visualizar a matrizAux
  	for(i=0; i<maqqtd; i++){
  		for(j=0; j<prodqtd; j++){
  			printf("%d ", matrizAux[i][j]);
  		}
  		printf("\n");
  	}
  	*/

  	linhas = maqqtd;
  	sai = 0;
  	indice = 0;
  	while (sai == 0) {

  		//zerar seq1 e seq2
  		for (i=0; i< prodqtd; i++) {
  			seq1[i] = 0;
  			seq2[i] = 0;
  		}

  		//preencher seq1
  		for (i=0; i<prodqtd; i++)
  		{
  			for (j=indice_inicio; j < (+linhas - (linhas/2)+ indice_inicio); j++)
  			{
  				seq1[i] += matrizAux[i][j];
  			}
  		}

  		//preencher seq2
  		for (i=0; i<prodqtd; i++)
  		{
  			for (j=+indice_inicio + (linhas/2); j < +linhas+indice_inicio; j++)
  			{
  				seq2[i] += matrizAux[i][j];
  			}
  		}

  		//ordenar colunas
  		for (i=0; i< prodqtd; i++)
  		{
  			// se o i == algum que ja ta no result colunas,
  			for (j=0, descarta = 0; j< prodqtd; j++)
  			{
  				if(i == result_coluna[j])
  				{
  					descarta = 1;
  				}
  			}
  			if(descarta == 0)
  			{
  				if (seq1[i] >= seq2[i]){
  					result_coluna[indice] = i;
  					indice++;
  				}
  			}
  		}

  		linhas = linhas/2;
  		indice_inicio = linhas;

  		//condicao de saida
  		for (i=0, sai = 0;i<prodqtd; i++)
  			if (result_coluna[i] != -1)
  				sai++;

  		if (sai == prodqtd)
  			sai = 1;
  		else
  			sai = 0;
  	}
    //matrizcna = matrizAux;
  	/*
  	printa a ordem das colunas na matriz final
  	for (i=0; i<prodqtd; i++)
  		printf("%d ", result_coluna[i]+1);
  	printf("\n");
  	*/

  	//matriz I ordenada (matrizFinal)
  	for (i=0; i<maqqtd; i++)
  	{
  		for (j=0; j<prodqtd; j++)
  		{
  			matrizcna[j][i] = matrizAux[result_coluna[j]][i];
  		}
  	}
/*
  	//visualizar a matrizFinal
  	for(i=0; i<maqqtd; i++){
  		for(j=0; j<prodqtd; j++){
  			printf("%d ", matriz[i][j]);
  		}
  		printf("\n");
  	}*/

}

function cna()
{

    for(a=0;a<maqqtd;a++)
      matrizcna[prodqtd][a] = a;
    for(a=0;a<prodqtd;a++)
      matrizcna[a][maqqtd] = a;

    gerarMatrizcna();
    fazerCna();
}
function gerarMatrizcna()
{
  matrizb = [];
  var a,b,c,cont;
  for(a=0;a<maqqtd;a++){ // Criando a matriz em O(maq²);
      matrizb[a] = [];
      for(b=0;b<maqqtd;b++){
          matrizb[a][b] = a===b ? -50 : 0; // Linha de ouro, usei um operador ternário
          }
  }
  matrizb[maqqtd]=[];

    matrizb[maqqtd] = []; // Criando slot forçado para salvar o resultado das somas.
    for(a=0;a<maqqtd;a++)
    matrizb[maqqtd][a]=0;

    for(a=0; a<(+maqqtd-1); a++){
  		for(b=(+a+1); b<maqqtd; b++){
  		    cont = 0;
  				for(c=0; c<prodqtd; c++){
            if(matrizcna[c][a]==0)
              continue;
  					if(matrizcna[c][b] == 1){
  						cont++;
  					}
  				}
  				matrizb[a][b]=cont; matrizb[b][a] = cont;
  		}
  	}
    for(a=0;a<maqqtd;a++)
      for(b=0;b<maqqtd;b++)
        if(matrizb[a][b]!==-50)
          matrizb[maqqtd][a] = (matrizb[maqqtd][a]==null) ? matrizb[a][b] : (+matrizb[maqqtd][a]+matrizb[a][b]);
}

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
            if ($("#p"+(b+1)+"m"+(a+1)).is(":checked")){
                matriz[b][a] = 1;
				total++;
			}
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

function imprimeMatriz(matriz_arg,destino)
{
  iteracoes++;
  document.getElementById(destino).innerHTML += "Matriz resultado de "+destino+": <br /><table bgcolor='#009999' style='border-radius: 10px; text-align: center; margin-top: 1em;' border='1' id ='t"+destino+"'> </table>";
  var table = document.getElementById("t"+destino);
  for(b=0;b<maqqtd;b++)
  {
    var row = table.insertRow(b);
    row.innerHTML = "Máq " + (matriz_arg[prodqtd][b]+1);
    for(c=0;c<prodqtd;c++)
    {		var cell = row.insertCell(c);
        cell.innerHTML = '<input type="checkbox" onclick="return false" style="cursor:auto" id="p'+(c+1) +'m'+(b+1)+'i'+iteracoes+'">';
        if(matriz_arg[c][b]==1)
          $('#p'+(c+1) +'m'+(b+1)+'i'+iteracoes+'').prop('checked', true);
    }
  }
  var head = table.insertRow(0);
    for(c=0;c<prodqtd;c++)
  {
    var cell1 = head.insertCell(c);
    cell1.innerHTML = "P" + (matriz_arg[c][maqqtd]+1);
  }
  cell1 = head.insertCell(0);
  cell1.innerHTML = destino;

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
	for(a=0; a<maqqtd; a++){
		matriz_arg[+prodqtd+1][a] = 0;
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
  for(a=0; a<prodqtd; a++){
		matriz_arg[a][+maqqtd+1] = 0;
	}

  //Calculando a soma
	for(a=0; a<prodqtd; a++){
	c=1;
		for(b=(+maqqtd-1); b>=0; b--){
			matriz_arg[a][+maqqtd+1] += ((matriz_arg[a][b])*c);
			c *= 2;
		}
	}
	return matriz_arg;
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
		alert("Insira apenas entradas válidas.");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	if(prodqtd<=0 || maqqtd<=0)
	{
		alert("Insira apenas números estritamente positivos.");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	else if(prodqtd>45 || maqqtd>45)
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
  document.getElementById("mtzdiv").style.display = "inline-block";
	criaTabela(prodqtd,maqqtd);
}

function Magica2()
{
//	 alert("Chama funcao calcular do codigo.js");
   lerMatriz();
   document.getElementById("resultado").style.display = "inline";
   document.getElementById("bnt2").style.display = "none";
   iteracoes = 0;
   roc();
	imprimeMatriz(matriz, "ROC");
	//cna();
	imprimeMatriz(matriz, "CNA");
}


function criaTabela(prodqtd,maqqtd)
{

		var b,c;
		var table = document.getElementById("tblin");
		table.innerHTML = "";
		for(b=0;b<maqqtd;b++)
		{
			var row = table.insertRow(b);
			row.innerHTML = "Máq " + (b+1);
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
			cell1.innerHTML = "P" + (c+1);
		}
		cell1 = head.insertCell(0);
		cell1.innerHTML = "ACP";
}

function getCelulasROC(cellqtdROC, destino)
{
	var i;
	document.getElementById(destino).innerHTML = "<br /><table id='t"+destino+"'></table>"
	var table = document.getElementById("t"+destino);
	for(i=0; i<cellqtdROC; i++){
		var row = table.insertRow(i);
		row.innerHTML = '<tr>PI da célula '+i+':<input type="text" style="width:3vw;" id="piROC'+i+'">PF da célula '+i+':<input type="text" style="width:3vw;" id="pfROC'+i+'"></tr><br />'+
		'<tr>MI da célula '+i+':<input type="text" style="width:3vw;" id="miROC'+i+'">MF da célula '+i+':<input type="text" style="width:3vw;" id="mfROC'+i+'"></tr><br />';
	}

}

function getCelulasCNA(cellqtdCNA, destino)
{
	var i;
	document.getElementById(destino).innerHTML = "<br /><table id='t"+destino+"'></table>"
	var table = document.getElementById("t"+destino);
	for(i=0; i<cellqtdCNA; i++){
		var row = table.insertRow(i);
		row.innerHTML = '<tr>PI da célula '+i+':<input type="text" style="width:3vw;" id="piCNA'+i+'">PF da célula '+i+':<input type="text" style="width:3vw;" id="pfCNA'+i+'"></tr><br />'+
		'<tr>MI da célula '+i+':<input type="text" style="width:3vw;" id="miCNA'+i+'">MF da célula '+i+':<input type="text" style="width:3vw;" id="mfCNA'+i+'"></tr><br />';
	}

}

function eficiencia()
{
	var i, j, cont=0, esp_ocup=0, esp_intra=0, eficROC;
	for(i=0; i<cellqtdROC; i++){
		for(j=($('#piROC'+i).val())-1; j<($('#pfROC'+i).val()); j++){
			for(k=($('#miROC'+i).val())-1; k<($('#mfROC'+i).val()); k++){
				if(matriz[j][k]==1){
					+cont++;
				}
			}
		}
		esp_ocup += cont;
		esp_intra += (+$('#pfROC'+i).val() -$('#piROC'+i).val()) * (+$('#mfROC'+i).val() -$('#miROC'+i).val());
	}

	inc_extra = total - esp_ocup;

	eficROC = ((1-(inc_extra/total))+(esp_ocup/esp_intra))/2;

	/*cont=0, esp_ocup=0, esp_intra=0;
	for(i=0; i<cellqtdCNA; i++){
		for(j=($('#piCNA'+i).val())-1; j<($('#pfCNA'+i).val()); j++){
			for(k=($('#miCNA'+i).val())-1; k<($('#mfCNA'+i).val()); k++){
				if(matriz[j][k]==1){
					+cont++;
				}
			}
		}
		esp_ocup += cont;
		esp_intra += (+$('#pfCNA'+i).val() - +$('#piCNA'+i).val()) * (+$('#mfCNA'+i).val() - +$('#miCNA'+i).val());
	}

	inc_extra = total - esp_ocup;

	eficCNA = ((1-(inc_extra/total))+(esp_ocup/esp_intra))/2;
	*/

	document.write(eficROC);

}
