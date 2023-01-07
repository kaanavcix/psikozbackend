const badWords: string[] = ["amk", "aq", "amq"];

function badWordFilter(value: string) {
    let isHave: boolean = false;
    badWords.forEach((badWord: string) => {
        if (value.includes(badWord)) {
            isHave = true;
        }
    });

    return isHave;
}

export default badWordFilter;
