const regions = [
    {
        ko: "관악구",
        en: "gwanakgu",
    },
    {
        ko: "서초구",
        en: "seochogu",
    },
    {
        ko: "강남구",
        en: "gangnamgu",
    },
];
const buttonContainer = document.getElementById("button-container");

regions.map((region) => {
    //console.log(region);

    //버튼 컨테이너에 버튼 생성해서 넣기
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.textContent = region.ko;
    buttonContainer.append(button);

    //버튼 클릭 이벤트
    button.addEventListener("click", function() {
        const targetId = this.region.en;
        console.log(targetId);


    });

    //svg 클래스 찾기

    //svg 색상 바꾸기
});
