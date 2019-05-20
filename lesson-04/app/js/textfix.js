function textFix() {
    let sourceText = document.getElementById('source').value;
    document.getElementById('destination').value = sourceText.replace(/\B'|'\B/g, '"');
}
document.getElementById('source').addEventListener("keyup", textFix);