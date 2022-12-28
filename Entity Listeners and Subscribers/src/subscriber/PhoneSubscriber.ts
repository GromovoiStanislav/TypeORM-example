import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Phone } from "../entity/Phone";

@EventSubscriber()
export class PhoneSubscriber implements EntitySubscriberInterface<Phone> {

    /**
     * Indicates that this subscriber only listen to Phone events.
     */
    listenTo() {
        return Phone;
    }

    /**
     * Called after entity is loaded.
     */
    afterLoad(entity: Phone) {
        console.log(`AFTER Phone LOADED: `, entity);
    }

    /**
     * Called before Phone insertion.
     */
    beforeInsert(event: InsertEvent<Phone>) {
        event.entity.countryCode = 7
        console.log(`BEFORE Phone INSERTED: `, event.entity);
    }

}