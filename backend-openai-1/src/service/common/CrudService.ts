export interface ICrudService<E, ID> {
    findAll?(): Promise<E[]>;
    findById?(id: ID): Promise<E | null>;
    create?(data: E): Promise<E>;
    update?(id: ID, data: E): Promise<E | null>;
    delete?(id: ID): Promise<void>;
}