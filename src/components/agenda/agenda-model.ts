import { User } from '../user/user-model'

export class Agenda {
    id?: number;
    start?: string;
    end?: string;
    title?: string;
    description?: string;
    appointmentPlaceX?: number;
    appointmentPlaceY?: number;
    appointmentPlace?: string;
    userId: number;
    user: User;
    constructor(agenda: any){
        this.id = agenda.id;
        this.start = agenda.start;
        this.end = agenda.end;
        this.title = agenda.title;
        this.description = agenda.description;
        this.appointmentPlace = agenda.appointmentPlace;
        this.appointmentPlaceX = agenda.appointmentPlaceX;
        this.appointmentPlaceY = agenda.appointmentPlaceY;   
        this.userId = agenda.userId; 
        this.user = agenda.user;        
    }
    
    get allDay(): boolean {
        return this.end == null;
    }
}
