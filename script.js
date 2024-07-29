const input_agua = document.getElementById('agua');
const input_cimento = document.getElementById('cimento');
const input_areia = document.getElementById('areia');
const input_areia2 = document.getElementById('areia2');
const input_cal = document.getElementById('cal');
const input_cal2 = document.getElementById('cal2');
const input_volume = document.getElementById('volume');

const displays = ['display-agua','display-cimento','display-areia2','display-areia','display-cal','display-cal2','display-volume'];

function obterValores(){
    const agua = parseFloat(input_agua.value);
    const cimento = parseFloat(input_cimento.value);
    const areia = parseFloat(input_areia.value);
    const areia2 = parseFloat(input_areia2.value);
    const cal = parseFloat(input_cal.value);
    const cal2 = parseFloat(input_cal2.value);
    const volume = parseFloat(input_volume.value);
    return {agua, cimento, areia2, areia, cal, cal2, volume}
}

function camposCompleto() {
    const valores = obterValores();
    for (const key in valores){
        const valor = valores[key]
        if (isNaN(valor) || valor <= 0) {
            if (key != 'cal2' & key != 'cal' & key!= 'areia' & key != 'areia2'){
                return false
            }
        }
    }
    return true;
}

function escreverResultado(resultado) {
    const unidades = ['m³','Kg','m³','m³','m³','m³','m³']
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
    const {agua, cimento, areia2, areia, cal, cal2, volume} = valores;
    const padiola = 36; // o volume de uma padiola é 36 litros
    const soma_traco = cimento + areia2 + areia + cal + cal2;

    const traco_agua = agua/padiola;

    const somatorio_traco = soma_traco + traco_agua;

    const volume_agua = (traco_agua / somatorio_traco) * volume;
    const volume_cimento = (cimento / somatorio_traco) * volume;
    const volume_areia2 =  (areia2 / somatorio_traco) * volume;
    const volume_areia =  (areia / somatorio_traco) * volume;
    const volume_cal =  (cal / somatorio_traco) * volume;
    const volume_cal2 =  (cal2 / somatorio_traco) * volume;

    return {volume_agua, volume_cimento, volume_areia2, volume_areia, volume_cal, volume_cal2};
}

function calularPeso(volume_cimento){
    const peso_cimento_por_padiola = 70/36;
    const peso_cimento = volume_cimento * peso_cimento_por_padiola*1000;
    return peso_cimento;
}

function calcularResultado(valores){
    const {volume} = valores;
    const {volume_agua, volume_cimento, volume_areia2, volume_areia, volume_cal, volume_cal2} = calcularVolumes(valores);
    const peso_cimento = calularPeso(volume_cimento);

    return {agua:volume_agua, cimento: peso_cimento, areia2:volume_areia2, areia: volume_areia, cal: volume_cal, cal2: volume_cal2, volume};
}

function calcular(event) {
    event.preventDefault();
    if (camposCompleto()){
        const valores_input = obterValores();
        const resultado = calcularResultado(valores_input);
        escreverResultado(resultado);
    }else{
        resetarCampos()
    }
}