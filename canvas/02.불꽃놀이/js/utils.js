//랜덤 숫자 생성
export const randomNumBetween = (min, max) => {
    return Math.random() * (max - min) + min;
};

//빗변 길이
export const hypotenuse = (x, y) => {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

//위와 같은 함수들은 임의의 숫자 생성과 삼각함수 계산을 위해 사용된다.
//이 코드에서는 랜덤 숫자 생성과 삼각 함수를 통해 
//파티클과 테일 등을 캔버스에 그리기 위한 위치 및 속도 등을 계산하는 데 사용된다.