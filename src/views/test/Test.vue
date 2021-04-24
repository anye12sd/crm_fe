<template>
    <a-layout class="main-layout">
        <a-button @click="re">重来</a-button>
        <div>{{reNumber2}}</div>
    </a-layout>
</template>

<script>
    export default {
        name: "Test",
        data(){
            return {
                a: 0,
                redNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24,25,26,27,28,29,30,31,32,33],
                blueNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 15, 16,],
                number: [1, 4, 11, 19, 32, 33, 5],
                array: [1, 4, 11, 19, 32, 33, 5],
                randomRed: 0,
                randomBlue: 0,
                reNumber: 1,
                reNumber2: 1,
                red: false
            }
        },
        mounted() {
            this.fetch1()
        },
        methods: {
            fetch1(){
                if(this.red){
                    this.a = '中奖了！你买了'+this.reNumber2+'次彩票'
                    console.log("已经中奖了")
                    return -1
                }
                this.array = []
                for(var i = 33; i > 27 ; i--){
                    this.randomRed = Math.floor(Math.random() * i)
                    this.array.push(this.redNumber[this.randomRed])
                    this.redNumber.splice(this.randomRed, 1);
                    this.array.sort(this.sortArr)
                }
                this.randomBlue = Math.floor(Math.random() * 16)
                this.array.push(this.blueNumber[this.randomBlue])
                // console.log(this.array)
                this.check()
            },
            re(){
                this.redNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24,25,26,27,28,29,30,31,32,33]
                this.fetch1()
            },
            sortArr(a, b){
                return a-b
            },
            check(){
                if(this.array.toString() == this.number.toString()){
                    this.red=true
                    console.log(this.reNumber)
                    return -1
                }else{
                    this.reNumber += 1
                    this.reNumber2 += 1
                    // console.log(this.reNumber2)
                    this.re()
                }
            }
        }
    }
</script>

<style scoped>

</style>