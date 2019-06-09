import moment from 'moment';
export class TheMovieDB {

    constructor() {
        this.url = 'https://api.themoviedb.org/3';
        this.api = '<TU_API_KEY>';
    }

    async getPopular() {
        const resp = await fetch(`${this.url}/discover/movie?sort_by=popularity.desc&api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

    async inTheatres() {
        const resp = await fetch(`${this.url}/discover/movie?primary_release_date.gte=${moment().format('YYYY-MM-DD')}&primary_release_date.lte=${moment().add(7, 'days').format('YYYY-MM-DD')}&api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

    async popularKids() {
        const resp = await fetch(`${this.url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

    async bestMovies() {
        const resp = await fetch(`${this.url}/discover/movie?primary_release_year=${moment().format('YYYY')}&api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

    async getVideos(id) {
        const resp = await fetch(`${this.url}/movie/${id}/videos?api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

    async getMovie(id) {
        const resp = await fetch(`${this.url}/movie/${id}?api_key=${this.api}&append_to_response=videos&language=es-AR`);
        return await resp.json();
    }

    async search(movie) {
        const resp = await fetch(`${this.url}/search/movie?query=${movie}&api_key=${this.api}&language=es-AR`);
        return await resp.json();
    }

}