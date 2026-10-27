'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

export default function ModalNovoProfessor({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="w-[32rem] max-w-[calc(100vw-2rem)]"
      >
        <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Novo professor</h2>
            <p className="mt-1 text-sm text-neutral-500">Preencha os dados do novo professor.</p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 py-5">
          <div className="col-span-2">
            <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-neutral-700">Nome completo</label>
            <input id="nome" required placeholder="Ex.: Ana Beatriz Ramalho" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40" />
          </div>

          <div>
            <label htmlFor="cpf" className="mb-1.5 block text-sm font-medium text-neutral-700">CPF</label>
            <input id="cpf" required inputMode="numeric" maxLength={14} placeholder="000.000.000-00" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40" />
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-neutral-700">Telefone</label>
            <input id="telefone" type="tel" required placeholder="(48) 99999-0000" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40" />
          </div>

          <div className="col-span-2">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">E-mail</label>
            <input id="email" type="email" required placeholder="nome@lckrclub.com" className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40" />
          </div>

          <div>
            <label htmlFor="valor" className="mb-1.5 block text-sm font-medium text-neutral-700">Valor por hora</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">R$</span>
              <input id="valor" required inputMode="decimal" placeholder="0,00" className="w-full rounded-md border border-neutral-300 py-2 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-brand px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-brand-dark"
          >
            Salvar professor
          </button>
        </div>
      </form>
    </Modal>
  );
}