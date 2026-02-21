function getBestVoice() {
    var voices = window.speechSynthesis.getVoices();
    var useMale = document.getElementById('voiceGenderToggle').checked;
    var jaVoices = voices.filter(function(v) { return v.lang.includes('ja'); });

    if (jaVoices.length === 0) return null;

    if (useMale) {
        // 安卓 Google 語音引擎常見的男聲關鍵代號與關鍵字
        var maleVoice = jaVoices.find(function(v) {
            var name = v.name.toLowerCase();
            return name.includes('male') || 
                   name.includes('otoya') || 
                   name.includes('ichiro') ||
                   name.includes('google-jp-male') ||
                   // 以下是安卓 Google TTS 常見的男聲代碼特徵
                   name.includes('x-jdj') || 
                   name.includes('x-fis');
        });
        return maleVoice || jaVoices[0]; // 找不到男聲則回退
    }
    return jaVoices[0];
}
