CREATE SCHEMA "SunsetArena";

-- -----------------------------------------------------
-- Table SunsetArena.Usuario
-- -----------------------------------------------------
CREATE TABLE "SunsetArena"."Usuario" (
  "cpf" CHAR(14) PRIMARY KEY,
  "nome" VARCHAR(60) NOT NULL,
  "email" VARCHAR(80) UNIQUE,
  "senha" VARCHAR(80),
  "telefone" CHAR(15)
);

-- -----------------------------------------------------
-- Table SunsetArena.Plano
-- -----------------------------------------------------
CREATE TABLE "SunsetArena"."Plano" (
  "id" SERIAL PRIMARY KEY,
  "preco" FLOAT,
  "descricao" VARCHAR(100),
  "nome" VARCHAR(60)
);

-- -----------------------------------------------------
-- Table SunsetArena.Patrocinador
-- -----------------------------------------------------
CREATE TABLE "SunsetArena"."Patrocinador" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(60),
  "descricao" VARCHAR(100),
  "imagem" VARCHAR(200)
);

-- -----------------------------------------------------
-- Table SunsetArena.Quadra
-- -----------------------------------------------------
CREATE TABLE "SunsetArena"."Quadra" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(60),
  "idPatrocinador" INT,
  CONSTRAINT "fk_Quadra_Patrocinador"
    FOREIGN KEY ("idPatrocinador")
    REFERENCES "SunsetArena"."Patrocinador" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table SunsetArena.Reserva
-- -----------------------------------------------------
CREATE TABLE "SunsetArena"."Reserva" (
  "id" SERIAL PRIMARY KEY,
  "idPlano" INT NOT NULL,
  "cpfUsuario" CHAR(14) NOT NULL,
  "dataInicio" DATE,
  "dataFim" DATE,
  "idQuadra" INT NOT NULL,
  CONSTRAINT "fk_Reserva_Plano"
    FOREIGN KEY ("idPlano")
    REFERENCES "SunsetArena"."Plano" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_Reserva_Usuario"
    FOREIGN KEY ("cpfUsuario")
    REFERENCES "SunsetArena"."Usuario" ("cpf")
    ON DELETE CASCADE
    ON UPDATE NO ACTION
  CONSTRAINT "fk_Reserva_Quadra"
    FOREIGN KEY ("idQuadra")
    REFERENCES "SunsetArena"."Quadra" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

