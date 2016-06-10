var matriz = new Array([],[]);
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
		alert("Por favor, entre com entradas válidas primeiramente!");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	if(prodqtd<=0 || maqqtd<=0)
	{
		alert("Apenas Números válidos por favor");
		document.getElementById("prodtxt").value = "";
		document.getElementById("maqtxt").value = "";
		document.getElementById("prodtxt").focus();
		return;
	}
	document.getElementById("entradas").style.display = "none"; // OCULTA INPUT FIELDS
 	document.getElementById("bnt2").style.display = "inline"; // E MOSTRA BT2
	criaTabela(prodqtd,maqqtd);
}

function Magica2()
{
	 alert("Chama funcao calcular do codigo.js");
         lerMatriz();
	 if (confirm('Gostaria de tentar com outra entrada?')) {
		document.getElementById("entradas").style.display = "initial"; // OCULTA INPUT FIELDS
		document.getElementById("bnt2").style.display = "none";
		limpaTabela();
}	 else {
		window.location.href = "obrigado.html";
}
}

function lerMatriz()
{
    var a,b;
    matriz = new Array(prodqtd);
    for(b=0;b<prodqtd;b++){
        matriz[b] = new Array(maqqtd);
        for(a=0; a<maqqtd;a++)
        {
            if ($("#p"+(b+1)+"m"+(a+1)).is(":checked"))
                matriz[b][a] = 1;
            else
                matriz[b][a] = 0;
        }
    }
}

function gerarMatrizcna()
{

}

function roc()
{
    var matriz_aux = new Array([],[]);
    copiarMatrizes(matriz, matriz_aux, prodqtd,maqqtd);
    somarLinhas(matriz_aux, prodqtd, maqqtd);
    ordenaMatrizLinhas(matriz_aux, prodqtd, maqqtd);
    somarColunas(matriz_aux, prodqtd, maqqtd);
    ordenaMatrizColunas(matriz_aux, prodqtd, maqqtd);
    imprimeMatriz(matriz_aux);
    if(!compararMatrizes(matriz, matriz_aux, i,j)) // Se tem que fazer mais iteracoes
    {
        copiarMatrizes(matriz_aux,matriz, prodqtd, maqqtd);
        roc();
    }
}
function compararMatrizes(matriz1, matriz2, i,j)
{
    var b,c;
    for(b=0;b<i;jb++)
        for(c=o;c<j;c++)
            if(matriz1[b][c]!==matriz2[b][c])
                return 0;
    return 1;
}
/* 
// Dada uma matriz de I produtos e J máquinas, onde no slot i,j temos o número do produto/máquina
// e no slot i+1, j+1 temos os slots destinado para as somas

function somarLinhas(matriz, i, j)
{
    //Fazer o somatório das linhas e salvar no slot i+1
}
function somarColunas(matriz, i, j)
{
    // fazer o somatório das colunas e salvar no slot j+1
}

function copiarMatrizes(matriz1, matriz2, i,j)
{

}

function ordenaMatrizLinha(matriz, i, j)
{
    // Usar como referencia a função ordenar
    // trocar a linha inteira
}

function ordenaMatrizColuna(matriz, i, j)
{
  //idem acima
}

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