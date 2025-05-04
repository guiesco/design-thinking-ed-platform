import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import { ChallengeDefinition } from 'src/app/common/interfaces/challenge-definition.interface';
import { EmpathyMapEntry } from 'src/app/common/interfaces/empathy-map.interface';
import { ProblemDefinition } from 'src/app/common/interfaces/problem-definition-response.interface';
import { Project } from 'src/app/common/interfaces/project.interface';
import { ProjectFacade } from 'src/app/stores/project-store/project.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

/**
 * Interface que representa um nó na árvore de artefatos
 */
export interface ArtifactNode {
  name: string;
  children?: ArtifactNode[];
  data?: any;
  type?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent implements OnInit, OnDestroy {
  isSidenavOpen = false;
  treeData: ArtifactNode[] = [];
  selectedNode: ArtifactNode | null = null;
  projectId: number | null = null;

  private destroyed$ = new Subject<void>();

  constructor(
    readonly userFacade: UserFacade,
    private projectFacade: ProjectFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  readonly isUserProfessor$ = this.userFacade.user$.pipe(
    map((user) => user?.userType === UserTypeEnum.PROFESSOR)
  );

  ngOnInit(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      console.log(
        '🚀 ~ PageWrapperComponent ~ this.userFacade.user$.pipe ~ user:',
        user
      );
      if (user?.userType === UserTypeEnum.PROFESSOR) {
        this.isSidenavOpen = true;
      }
    });

    // Verifica se está em uma rota de projeto
    // this.route.firstChild?.params
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((params) => {
    //     console.log('🚀 ~ PageWrapperComponent ~ .subscribe ~ params:', params);
    //     if (params['projectId']) {
    //       this.projectId = +params['projectId'];
    //       this.projectFacade.loadProject(this.projectId);
    //       this.listenToProjectChanges();
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  /**
   * Ouve as mudanças no projeto atual e transforma os dados em uma estrutura de árvore
   */
  private listenToProjectChanges(): void {
    this.projectFacade.currentProject$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((project) => {
        console.log(
          '🚀 ~ PageWrapperComponent ~ .subscribe ~ project:',
          project
        );
        if (project) {
          this.buildArtifactTree(project);
        }
      });
  }

  /**
   * Constrói a árvore de artefatos a partir dos dados do projeto
   */
  private buildArtifactTree(project: Project): void {
    this.treeData = [
      {
        name: 'Definição do Desafio',
        expanded: false,
        type: 'challengeDefinition',
        data: project.challengeDefinition,
        children: this.createChallengeDefinitionNodes(
          project.challengeDefinition
        ),
      },
      {
        name: 'Mapa de Empatia',
        expanded: false,
        type: 'empathyMap',
        data: project.empathyMap,
        children: this.createEmpathyMapNodes(project.empathyMap),
      },
      {
        name: 'Definição do Problema',
        expanded: false,
        type: 'problemDefinition',
        data: project.problemDefinition,
        children: this.createProblemDefinitionNodes(project.problemDefinition),
      },
    ];
  }

  /**
   * Cria os nós filhos para o artefato de Definição do Desafio
   */
  private createChallengeDefinitionNodes(
    challengeDefinition: ChallengeDefinition
  ): ArtifactNode[] {
    if (!challengeDefinition) return [];

    return [
      {
        name: 'Problemas',
        data: challengeDefinition.problems,
        type: 'problems',
      },
      {
        name: 'Público-Alvo',
        data: challengeDefinition.targetAudience,
        type: 'targetAudience',
      },
      {
        name: 'Como Podemos',
        data: challengeDefinition.howWeCan,
        type: 'howWeCan',
      },
      {
        name: 'Brainstorm',
        data: challengeDefinition.brainstorm,
        type: 'brainstorm',
      },
    ];
  }

  /**
   * Cria os nós filhos para o artefato de Mapa de Empatia
   */
  private createEmpathyMapNodes(empathyMap: EmpathyMapEntry): ArtifactNode[] {
    if (!empathyMap) return [];

    return [
      {
        name: 'Pensa',
        data: empathyMap.think,
        type: 'think',
      },
      {
        name: 'Sente',
        data: empathyMap.feel,
        type: 'feel',
      },
      {
        name: 'Fala',
        data: empathyMap.say,
        type: 'say',
      },
      {
        name: 'Faz',
        data: empathyMap.do,
        type: 'do',
      },
      {
        name: 'Dores',
        data: empathyMap.pains,
        type: 'pains',
      },
      {
        name: 'Necessidades',
        data: empathyMap.needs,
        type: 'needs',
      },
    ];
  }

  /**
   * Cria os nós filhos para o artefato de Definição do Problema
   */
  private createProblemDefinitionNodes(
    problemDefinition: ProblemDefinition
  ): ArtifactNode[] {
    if (!problemDefinition) return [];

    return [
      {
        name: 'Questão Principal',
        data: problemDefinition.mainQuestion,
        type: 'mainQuestion',
      },
      {
        name: 'Público-Alvo',
        data: problemDefinition.targetAudience,
        type: 'targetAudience',
      },
      {
        name: 'Consequências',
        data: problemDefinition.consequences,
        type: 'consequences',
      },
      {
        name: 'Visão Alternativa',
        data: problemDefinition.alternativeView,
        type: 'alternativeView',
      },
      {
        name: 'Fatores Sociais',
        data: problemDefinition.socialFactors,
        type: 'socialFactors',
      },
      {
        name: 'Definição do Problema',
        data: problemDefinition.problemDefinition,
        type: 'problemDefinition',
      },
    ];
  }

  /**
   * Manipula o clique em um nó da árvore
   */
  handleNodeClick(node: ArtifactNode): void {
    // Se for um nó pai, expande/colapsa
    if (node.children && node.children.length > 0) {
      node.expanded = !node.expanded;
    }

    // Atualiza o nó selecionado
    this.selectedNode = node;
  }

  /**
   * Prepara os dados para exibição no componente info-display
   */
  getDisplayData(node: ArtifactNode): any {
    if (!node || !node.data) return null;

    // Se for um array, retorna um objeto estruturado para exibição
    if (Array.isArray(node.data)) {
      return {
        [node.name]: node.data,
      };
    }

    // Se for um objeto, retorna diretamente
    return node.data;
  }

  /**
   * Obtém labels traduzidos para as chaves dos dados
   */
  getKeyLabels(type: string | undefined): Record<string, string> {
    const commonLabels: Record<string, string> = {
      think: 'Pensa',
      feel: 'Sente',
      say: 'Fala',
      do: 'Faz',
      pains: 'Dores',
      needs: 'Necessidades',
      problems: 'Problemas',
      targetAudience: 'Público-Alvo',
      howWeCan: 'Como Podemos',
      brainstorm: 'Brainstorm',
      mainQuestion: 'Questão Principal',
      consequences: 'Consequências',
      alternativeView: 'Visão Alternativa',
      socialFactors: 'Fatores Sociais',
      problemDefinition: 'Definição do Problema',
    };

    return commonLabels;
  }
}
