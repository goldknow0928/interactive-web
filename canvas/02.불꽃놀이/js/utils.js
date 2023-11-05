//랜덤 숫자 생성
export const randomNumBetween = (min, max) => { 
	return Math.random() * (max - min) + min;
}

//빗변 길이
export const hypotenuse = (x, y) => { 
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}