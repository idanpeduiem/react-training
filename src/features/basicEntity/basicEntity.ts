class BasicEntity {
    id: string;
    title: string;
    description: string;

    constructor(id: string, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    getId = () => this.id;

    setId = (id: string) => this.id = id;

    getTitle = () => this.title;

    setTitle = (title: string) => this.title = title;

    getDescription = () => this.description;

    setDescription = (description: string) => this.description = description;
}

export default BasicEntity;