const input_agua = document.getElementById('agua');
const input_cimento = document.getElementById('cimento');
const input_areia = document.getElementById('areia');
const input_cal = document.getElementById('cal');
const input_volume = document.getElementById('volume');

const displays = ['display-agua','display-cimento','display-areia','display-cal','display-volume'];

function obterValores(){
    const agua = parseFloat(input_agua.value);
    const cimento = parseFloat(input_cimento.value);
    const areia = parseFloat(input_areia.value);
    const cal = parseFloat(input_cal.value);
    const volume = parseFloat(input_volume.value);
    return {agua, cimento, areia, cal, volume}
}

function camposCompleto() {
    const valores = obterValores();
    for (const key in valores){
        const valor = valores[key]
        if (isNaN(valor) || valor <= 0) {
            return false
        }
    }
    return true;
}

function escreverResultado(resultado) {
    const unidades = ['Litros','Kg','Litros','Litros','Litros']
    let i = 0;

    for (const d of displays) {
        const name_display = d.split('-')[1];
        const display = document.getElementById(d);
        display.innerText = resultado[name_display].toFixed(2) + " " + unidades[i];
        display.classList.remove('text-secondary');
        display.classList.add('fw-bold');
        i++;
    }
}

function resetarCampos() {
    for (const d of displays) {
        const display = document.getElementById(d);
        display.innerText = "Preencha todos os dados";
        display.classList.add('text-secondary');
    }
}

function calcularVolumes(valores) {
    const {agua, cimento, areia, cal, volume} = valores;
    const padiola = 36; // o volume de uma padiola é 36 litros
    const soma_traco = cimento + areia + cal;

    const traco_agua = agua/padiola;

    const somatorio_traco = soma_traco + traco_agua;

    const volume_agua = (traco_agua / somatorio_traco) * volume;
    const volume_cimento = (cimento / somatorio_traco) * volume;
    const volume_areia =  (areia / somatorio_traco) * volume;
    const volume_cal =  (cal / somatorio_traco) * volume;

    return {volume_agua, volume_cimento, volume_areia, volume_cal};
}

function calularPeso(volume_cimento){
    const peso_cimento_por_padiola = 70/36;
    const peso_cimento = volume_cimento * peso_cimento_por_padiola;
    return peso_cimento;
}

function calcularResultado(valores){
    const {volume} = valores;
    const {volume_agua, volume_cimento, volume_areia, volume_cal} = calcularVolumes(valores);
    const peso_cimento = calularPeso(volume_cimento);

    return {agua:volume_agua, cimento: peso_cimento, areia: volume_areia, cal: volume_cal, volume};
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