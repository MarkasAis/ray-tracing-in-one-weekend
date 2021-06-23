class Timer {
    start() {
        this.startTime = (new Date()).getTime();
        this.progress = 0;
    }

    update(progress) {
        this.progress = progress;
    }

    query() {
        const timeElapsed = ((new Date()).getTime() - this.startTime) * 0.001;
        const averageSpeed = timeElapsed / this.progress;
        const timeRemaining = (1 - this.progress) * averageSpeed;

        return {
            timeElapsed: timeElapsed,
            timeRemaining: timeRemaining
        }
    }

    timeToString(time) {
        time = ~~(time);

        const seconds = time % 60;
        time = ~~(time/60);

        const minutes = time % 60;
        time = ~~(time/60);

        const hours = time;

        let string = '';

        if (hours > 0) string += hours + 'h ';
        if (minutes > 0) string += minutes + 'min ';
        string += seconds + 's';

        return string;
    }

    print() {
        const info = this.query();

        console.log(`Progress: [${~~(this.progress*100)}%] | Time Elapsed: [${this.timeToString(info.timeElapsed)}] | Time Remaining: [${this.timeToString(info.timeRemaining)}]`)
    }
}
