"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuario_model_1 = __importDefault(require("./Usuario.model"));
const Formulario_model_1 = __importDefault(require("./Formulario.model"));
const RespuestaUsuario_1 = __importDefault(require("./RespuestaUsuario"));
let FormularioRespondido = class FormularioRespondido extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], FormularioRespondido.prototype, "codformulariorespondido", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuario_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], FormularioRespondido.prototype, "codusuario", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Formulario_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], FormularioRespondido.prototype, "codformulario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuario_model_1.default),
    __metadata("design:type", Usuario_model_1.default)
], FormularioRespondido.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], FormularioRespondido.prototype, "fecharespuesta", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], FormularioRespondido.prototype, "tokenformulariousuario", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => RespuestaUsuario_1.default),
    __metadata("design:type", Array)
], FormularioRespondido.prototype, "respuestasUsuario", void 0);
FormularioRespondido = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "formulariorespondido",
        timestamps: false,
    })
], FormularioRespondido);
exports.default = FormularioRespondido;
//# sourceMappingURL=FormularioRespondido.model.js.map