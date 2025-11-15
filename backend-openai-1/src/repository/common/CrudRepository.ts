export interface ICrudRepository<E, ID> {
    findAll?(): Promise<E[]>;
    findById?(id: ID): Promise<E | null>;
    create?(entity: E): Promise<E>;
    update?(id: ID, entity: E): Promise<E | null>;
    delete?(id: ID): Promise<void>;
}