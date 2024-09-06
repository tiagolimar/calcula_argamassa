const displays = ['display-agua','display-brita','display-cimento','display-areia2','display-areia','display-cal','display-cal2','display-volume'];

const peso_especifico_argamassa = 2000; // em kg/m³
const peso_especifico_concreto = 2400; // em kg/m³

function ehConcreto() {
    const valor = document.getElementById('brita').value;
    const parse_valor = parseFloat(valor);
    const teste = isNaN(parse_valor) ? 0 : parse_valor;
    return teste
}

function obterValores(){
    const inputs = ['agua','brita','cimento','areia','areia2','cal','cal2','volume'];
    const valores = {}
    for (const input of inputs) {
        const valor = document.getElementById(input).value;
        const parse_valor = parseFloat(valor);
        valores[input] = isNaN(parse_valor) ? 0 : parse_valor;
    }
    return valores
}

function camposCompleto() {
    const valores = obterValores();
    if (isNaN(valores.agua) == false && valores.agua > 0 && isNaN(valores.volume) == false && valores.volume > 0){
        for (const key in valores){
            const valor = valores[key]
            if (isNaN(valor) == false && valor > 0 && key !== 'agua' && key !== 'volume') {
                return true;
            }
        }
    }
    
    return false;
}

function escreverResultado(resultado) {
    const unidades = ['m³','m³','Kg','m³','m³','m³','m³','m³']
    let i = 0;

    for (const d of displays) {
        const name_display = d.split('-')[1];
        const display = document.getElementById(d);
        
        if (!isNaN(resultado[name_display])){
            const text = resultado[name_display].toFixed(3) + " " + unidades[i]
            display.innerText = text.replaceAll('.',',');
            display.classList.remove('text-secondary');
            display.classList.add('fw-bold');
        }
        i++;
    }
}

function resetarCampos() {
    for (const d of displays) {
        const display = document.getElementById(d);
        display.innerHTML = "Preencha todos os dados";
        display.classList.add('text-secondary');
    }
}

function calcularVolumes(valores) {
    const {agua, brita, cimento, areia2, areia, cal, cal2, volume} = valores;
    const padiola = 36; // o volume de uma padiola é 36 litros
    const soma_traco = brita + cimento + areia2 + areia + cal + cal2;

    const traco_agua = agua/padiola;

    const somatorio_traco = soma_traco + traco_agua;

    const volume_agua = (traco_agua / somatorio_traco) * volume;
    const volume_brita = (brita / somatorio_traco) * volume;
    const volume_cimento = (cimento / somatorio_traco) * volume;
    const volume_areia2 = (areia2 / somatorio_traco) * volume;
    const volume_areia = (areia / somatorio_traco) * volume;
    const volume_cal = (cal / somatorio_traco) * volume;
    const volume_cal2 = (cal2 / somatorio_traco) * volume;

    return {volume_agua, volume_brita, volume_cimento, volume_areia2, volume_areia, volume_cal, volume_cal2};
}

function calularPeso(volume_cimento){
    const peso_cimento_por_padiola = 70/36;
    const peso_cimento = volume_cimento * peso_cimento_por_padiola*1000;
    return peso_cimento;
}

function calcularResultado(valores){
    const {volume} = valores;
    const {volume_agua, volume_brita, volume_cimento, volume_areia2, volume_areia, volume_cal, volume_cal2} = calcularVolumes(valores);
    const peso_cimento = calularPeso(volume_cimento);

    return {agua:volume_agua, brita: volume_brita, cimento: peso_cimento, areia2:volume_areia2, areia: volume_areia, cal: volume_cal, cal2: volume_cal2, volume};
}

function sincronizarTotais(id) {    
    if (id == 'volume'){
        const volume = parseFloat(document.getElementById('volume').value);
        const input_peso = document.getElementById('peso');
        const peso_especifico = ehConcreto()? peso_especifico_concreto : peso_especifico_argamassa;
    
        if (isNaN(volume) == false){
            input_peso.value = volume*peso_especifico;
        }
    }

    if (id == 'peso'){
        const peso = parseFloat(document.getElementById('peso').value);
        const input_volume = document.getElementById('volume');
    
        if (isNaN(peso) == false){
            input_volume.value = peso/peso_especifico;
        }
    }
}

function calcular(event) {
    event.preventDefault();
    const id = event.target.id;

    sincronizarTotais(id);

    if (camposCompleto()){
        const valores_input = obterValores();
        
        const resultado = calcularResultado(valores_input);
        escreverResultado(resultado);
    }else{
        resetarCampos()
    }
}

function main() {
    const display_peso = document.getElementById('display-peso');
    const display_peso_concreto = document.getElementById('display-peso-concreto');
    display_peso.innerHTML = peso_especifico_argamassa + ' ';
    display_peso_concreto.innerHTML = peso_especifico_concreto + ' ';
}

main();